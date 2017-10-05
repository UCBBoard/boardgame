const router = require("express").Router();
const Article = require("../../models/Articles.js");
const Game = require("../../models/Games.js");
const User = require("../../models/Users.js")
const request = require("request");
const cheerio = require("cheerio");
const Nightmare = require("nightmare");
const mongoose = require("mongoose");
const axios = require("axios");
var parseString = require('xml2js').parseString;

// Newsfeed scraper - searches top links in r/boardgames for the users.
router.get("/news/scrape", function(req, res){
	request("https://www.reddit.com/r/boardgames/top/?sort=top&t=day", function(error, response, html) {
		let blacklist = ["self.boardgames", "youtube.com", "youtu.be"];
		let $ = cheerio.load(html);
		$("p.title").each(function(i, element) {
			if (!blacklist.includes($(element).children("span").children("a").text())){
				let article = new Article({
					title: $(element).children("a").text(),
					link: $(element).children("a").attr("data-href-url"),
				})
				Article.findOne({title: article.title}, function(error, result){
					if (!result){
						article.save();
					}
				})
				
			}

		})
		setTimeout(function(){
			Article.find().sort({date: -1}).exec(function(error, result){
			res.json(result.slice(0,10))
		}), 1000
		})
	})
})

// For using BGG API to get boardgame info, currently returns the top game info for a given search
router.get("/games/:name", function(req, res){
	axios.get("https://www.boardgamegeek.com/xmlapi/search?search=" + req.params.name)
	.then(function(response){
		parseString(response.data, function (err, result) {
			let id = result.boardgames.boardgame[0]["$"]["objectid"];
			axios.get("https://boardgamegeek.com/xmlapi/boardgame/" + id)
			.then(function(response1){
				parseString(response1.data, function (err, result1) {
					res.json(result1);
				})
		  })
		});
	})
})

//Route to get 6 results back from a given word search to the BGG API. Used in the autofill input suggestions.
router.get("/games/search/:name", function(req, res){
	console.log("Searching: " + req.params.name);
	axios.get("https://www.boardgamegeek.com/xmlapi/search?search=" + req.params.name)
	.then(function(response){
		parseString(response.data, function (err, result) {
			res.json(result.boardgames.boardgame.slice(0, 6))
		});
	})
})

// This is the route that the Gamelist Module calls when it mounts - searches the database, finds the user (passed in through params), and returns a populated list of games.
router.get("/games/:uid/mylist", (req, res) => {
	// if(res  null) {
		console.log("Getting user gamelist.");
		User.findOne({ _id : req.params.uid}).populate("games").exec((error, result) => {
			if(result.games != null) {
				res.json(result.games);
			}
		})
	// }
})

// For posting a new game linked to a users account. Called from the submit button on the add game modal in Dashboard component.
router.post("/newgame/:gameid/:uid", (req, res) => {
	let gameID = req.params.gameid;
	let userID = req.params.uid;
	axios.get("https://boardgamegeek.com/xmlapi/boardgame/" + gameID)
			.then(function(response1){
				parseString(response1.data, function (err, result1) {
					let game = {
						title: result1.boardgames.boardgame[0].name[0]["_"],
						minPlayers: parseInt(result1.boardgames.boardgame[0].minplayers),
						maxPlayers: parseInt(result1.boardgames.boardgame[0].maxplayers),
						playtime: parseInt(result1.boardgames.boardgame[0].maxplaytime)
					}

					let gameToAdd = new Game (game)
					Game.findOne({title: game.title}, function(error, result3){
						console.log("when adding new game, the result is " + result3);
						if (result3){
							User.findOneAndUpdate({ _id : userID }, {$push:  {games: result3._id}}).exec((error, result4) => {
								console.log("updating gamelist in User Profile")
								console.log(result4);
								return res.json(result4)
							})
						}

						else {
							gameToAdd.save(function(error, result2){
							console.log(result2);
							User.findOneAndUpdate({ _id : userID }, {$push:  {games: result2._id}}).exec((error, result) => {
								console.log("updating gamelist in User Profile")
								console.log(result);
								return res.json(result)
							})
						});
						}
					})
					
			})
		})
})

router.get("/cheese", (req, res) => {
	User.findOne({ _id : "lB1zqQNNuUhuVj9KnbMDm3PC0ew1"})
	.exec((error, result) => {
		res.json(result);
	})
})

// Route for deleting a game

router.delete("/games/deletegame/:uid/:game", (req, res) => {
	let userID = req.params.uid;
	let game = req.params.game
	console.log(`Deleting game ${game}`);
	User.findOneAndUpdate({ _id: userID}, {$pull: {games: game}}).exec((error, result) => {
		res.json(result)
	})
})

	// //Add the game to the Users mygameslist.
	// User.findOneAndUpdate({ _id : userID }, {$push:  {mygameslist : gameName}}).exec((error, result) => {
	// 	console.log(error);
	// 	Game.findOneAndUpdate({ title : gameName }, {$push: { users : userID}}).exec((error, result) => {
	// 		console.log(error);
	// 		res.json(result);
	// 	})
	// })


	//Add the user to the games user thing. Depending on which we want to use.

// Route for checking user status and getting mongoUID.
router.post("/user/:uid", (req, res) => {
			let user = new User({ _id : req.params.uid})
			User.findOne({_id: req.params.uid}, function(error, resultUser){
				if (!resultUser){
					user.save((error, result) => {
						if(!error) {
							return res.json(result);
						} else {
							return console.log(error);
						};
					});
				}

				else {
					res.json("");
				}
			})
			
	});

//Route for adding a user as a friend
router.post("/user/addfriend/:uid/:seconduid", (req, res) => {
	let userID = req.params.uid;
	let secondUserID = req.params.seconduid
	console.log(`We be addin friends ${userID} ${secondUserID}`);
	User.findOneAndUpdate({ _id: userID}, {$push: {friends: secondUserID} }).exec((error, result) => {
		console.log(error);
		User.findOneAndUpdate({ _id: secondUserID}, {$push: {friends: userID} }).exec((error, result) => {
			console.log(error);
			res.json(result);
		})
	})
})

//Route for deleting a user
router.delete("/user/deletefriend/:uid/:userToDelete", (req, res) => {
	let userID = req.params.uid;
	let secondUserID = req.params.userToDelete
	console.log(`Deleting user ${secondUserID}`);
	User.findOneAndUpdate({ _id: userID}, {$pull: {friends: secondUserID}}).exec((error, result) => {
		res.json(result)
	})
})

//Route for gettting active user's friends
router.get("/user/:uid/friends", (req, res) => {
	console.log("These are the users friends.");
	User.findOne({ _id : req.params.uid}).populate("friends").exec((error, result) => {
		res.json(result.friends);
	})
})

//Route for getting all users
router.get("/user/all", (req, res) => {
	console.log("These are all users signed up with Gamevault.");
	User.find({}).exec((error, result) => {
		res.json(result);
	})
})

module.exports = router;
