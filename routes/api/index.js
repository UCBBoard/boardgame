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
const levelHelper = require("../helper/levelHelper.js")
const socketHelper = require("../../server.js");

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
router.get("/games/:uid/mylist/:owned", (req, res) => {
	// if(res  null) {
		console.log("Getting user " + req.params.owned + ".");
		User.findOne({ _id : req.params.uid}).populate("games").populate("wishlist").exec((error, result) => {
			if(result.games != null) {
				if (req.params.owned === "wishlist") {
					console.log(result.games);
					res.json(result.wishlist);
				} else {
					console.log(result);
					res.json(result.games);
				}
			}
		})
	// }
})

// For posting a new game linked to a users account. Called from the submit button on the add game modal in Dashboard component.
router.post("/newgame/:gameid/:uid/:owned", (req, res) => {
	let gameID = req.params.gameid;
	let userID = req.params.uid;
	// User.findOne({ _id : userID}, (err, dupeCheck) => {
	// 	console.log("NEW DUPE CHECK");
	// 	console.log(dupeCheck);
	// })
	let ownedList = req.params.owned;
	axios.get("https://boardgamegeek.com/xmlapi/boardgame/" + gameID)
			.then(function(response1){
				parseString(response1.data, function (err, result1) {
					let newGameNames = result1.boardgames.boardgame[0].name;
					let gameTitle = "";
					newGameNames.map((gameName, i) => {
						if(!gameName.$.primary) {
							// console.log("not primary")
							return
						} else {
							// console.log("gameTitle is now set to: " + gameName._)
							gameTitle = gameName._;
						}
					})

				// Assemble the game object we will be sending to the DB.
					let game = {
						title: gameTitle,
						minPlayers: parseInt(result1.boardgames.boardgame[0].minplayers),
						maxPlayers: parseInt(result1.boardgames.boardgame[0].maxplayers),
						playtime: parseInt(result1.boardgames.boardgame[0].maxplaytime),
					}
					let gameToAdd = new Game (game)
				//Search the Game collection to see if the game exists
					Game.findOne({title: game.title}, function(error, result3){
						console.log("when adding new game, the result is " + result3);
					// If the game already exists...
						if (result3){
							var key = ownedList;
							var value = result3._id;
							let thisList = {};
							thisList[key] = value;
							console.log("<<<<<<result3>>>>>")
							console.log(result3);
						//Add it to the users profile, unless it already exists.
							User.findOneAndUpdate({ _id : userID }, {$addToSet:  thisList}).exec((error, result4) => {
								console.log("updating gamelist in User Profile")
								console.log(result4);
							//Update EXP for user.
								User.findOne({ _id : userID }).exec((error, result5) => {
									let newExp = levelHelper.stripExp(result5.exp + 10, result5.toNextLevel);
									User.findOneAndUpdate({ _id : userID }, {exp: newExp, level: levelHelper.levelHelper(result5.exp, 10, result5.toNextLevel, result5.level)}, function(error, res0){
										socketHelper.updateUser(userID, "exp");
										return res.json(result4)
									})
								})
							})
						}
					// If the game doesn't exist in the database..
						else {
						//Save it to the database...
							gameToAdd.save(function(error, result2){
							// console.log(result2);
							var key = ownedList;
							var value = result2._id;
							let thisList = {};
							thisList[key] = value;
						//Save the reference to the users collection...
							User.findOneAndUpdate({ _id : userID }, {$push:  thisList}).exec((error, result) => {
								// console.log("updating gamelist in User Profile")
								// console.log(result);
							//Update EXP for the user.
								User.findOne({ _id : userID }).exec((error, result5) => {
									let newExp = levelHelper.stripExp(result5.exp + 10, result5.toNextLevel);
									User.findOneAndUpdate({ _id : userID }, {exp: newExp, level: levelHelper.levelHelper(result5.exp, 10, result5.toNextLevel, result5.level)}, function(error, res0){
										socketHelper.updateUser(userID, "exp");
										return res.json(result)
									})
								})
							})
						});
						}
					})
					
			})
		})
})


// // Route for deleting a game
// router.post("/exp/:uid/:expToAdd", (req, res) => {
// 	// if(res  null) {
// 		User.findOne({ _id : req.params.uid}).update({exp: req.params.expToAdd}).exec((error, result) => {
// 			res.json("");
// 		})
// 	// }
// })

router.delete("/games/deletegame/:uid/:game/:owned", (req, res) => {
	let userID = req.params.uid;
	let game = mongoose.Types.ObjectId(req.params.game);
	let owned = req.params.owned;
	owned === "owned" ?  owned = "games" : owned = "wishlist";
	let thisList = {};
	thisList[owned] = game;
	console.log(thisList);
	console.log(`Deleting game ${game} from ${req.params.owned}`);
					// should be({ _id : userID}, {$pull: { owned : game}})
	User.findOneAndUpdate({ _id: userID}, {$pull: thisList}).exec((error, result) => {
		if(!error){
			res.json(result)
		} else {
			console.log(error);
		}
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
router.post("/user/:uid/:userName", (req, res) => {
	console.log("uid" + req.params.uid)
			let user = new User(
				{ _id : req.params.uid,
					name: req.params.userName,
					cardNum: Math.floor(Math.random() * 9),
				})
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
					res.json(resultUser);
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
		//Updating user 1 xp
		User.findOne({ _id : userID }).exec((error, result5) => {
			let newExp = levelHelper.stripExp(result5.exp + 50, result5.toNextLevel);
			User.findOneAndUpdate({ _id : userID }, {exp: newExp, level: levelHelper.levelHelper(result5.exp, 50, result5.toNextLevel, result5.level)}, function(error, res0){
				socketHelper.updateUser(userID, "exp");
			})
		})

		socketHelper.updateUser(userID, "friends");
		User.findOneAndUpdate({ _id: secondUserID}, {$push: {friends: userID} }).exec((error, result) => {
			//Updating user 2 xp
			User.findOne({ _id : secondUserID }).exec((error, result6) => {
				let newExp = levelHelper.stripExp(result6.exp + 50, result6.toNextLevel);
				User.findOneAndUpdate({ _id : secondUserID }, {exp: newExp, level: levelHelper.levelHelper(result6.exp, 50, result6.toNextLevel, result6.level)}, function(error, res0){
					socketHelper.updateUser(secondUserID, "exp");
				})
			})
			console.log(error);
			socketHelper.updateUser(secondUserID, "friends");
			User.findOneAndUpdate({ _id: userID}, {$pull: {notifications: secondUserID}}).exec((error, result) => {
				res.json(result.notifications)
			})
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
router.get("/user/all/:id?", (req, res) => {
	console.log(req.params.id)
	console.log("These are all users signed up with Gamevault.");
	if (!req.params.id){
		User.find({}).exec((error, result) => {
			res.json(result);
		})
	}

	else {
		User.findOne({_id: req.params.id}).exec((error, result) => {
			let friends = result.friends;
			friends.push(req.params.id);
				User.find({ _id: { $nin: friends } }).exec((errorFilter, resultFilter) => {
					res.json(resultFilter);
			})
		})
		
	}
	
})

//Route for adding a notification
router.post("/user/:uid/addnotification/:seconduid", (req, res) => {
	let userID = req.params.uid;
	let secondUserID = req.params.seconduid
	console.log(`We be addin notifications ${userID} ${secondUserID}`);
	User.findOneAndUpdate({ _id: userID}, {$push: {notifications: secondUserID} }).exec((error, result) => {
		console.log(error)
		socketHelper.updateUser(userID, "notifications");
		res.json(result);
	})
})

//Route for seeing users notifications
router.get("/user/:uid/notifications", (req, res) => {
	let userID = req.params.uid;
	console.log('These are users notifications')
	User.findOne({ _id: req.params.uid}).populate("notifications").exec((error, result) => {
		if (result){
			res.json(result.notifications)
		} else {
			return console.log(error)
		}
	})
})

//Route for getting users Lvl and XP
router.get("/user/:uid/exp", (req, res) => {
	let userID = req.params.uid;
	User.findOne({ _id: req.params.uid}).exec((error, result) => {
		if (result){
			res.json(result)
		} else {
			return console.log(error)
		}
	})
})
module.exports = router;
