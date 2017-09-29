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
				article.save();
			}

		})
		setTimeout(function(){
			Article.find().sort({date: -1}).exec(function(error, result){
			res.json(result.slice(0,5))
		}), 1000
		})
	})
})

// For scraping from BGG to get boardgame info
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

// This is the route that the Gamelist Module calls when it mounts - searches the database, finds the user (passed in through params), and returns a populated list of games.
router.get("/games/:uid/mylist", (req, res) => {
	console.log("Getting user gamelist.");
	User.findOne({ _id : req.params.uid}).exec((error, result) => {
		res.json(result);
	})
})

// For posting a new game linked to a users account. Called from the submit button on the add game modal in Dashboard component.
router.post("/newgame/:name/:uid", (req, res) => {
	let gameName = req.params.name;
	let userID = req.params.uid;
	console.log("Postin a god damned game, " + gameName);
	//Add the game to the Users mygameslist.
	User.findOneAndUpdate({ _id : userID }, {$push:  {mygameslist : gameName}}).exec((error, result) => {
		console.log(error);
		Game.findOneAndUpdate({ title : gameName }, {$push: { users : userID}}).exec((error, result) => {
			console.log(error);
			res.json(result);
		})
	})
	//Add the user to the games user thing. Depending on which we want to use.

})

// Route for checking user status and getting mongoUID.
router.post("/user/:uid", (req, res) => {
	console.log("<<<<<<<<<<<<<<<Trying to create new account.>>>>>>>>>>>>>>>>");
	let user = new User({ _id : req.params.uid })
	user.save((error, result) => {
		if(!error) {
			return res.json(result);
		} else {
			return console.log(error);
		}
	})
})


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

//Route for gettting all friends 
router.get("/user/:uid/friends", (req, res) => {
	console.log("These are the users friends.");
	User.findOne({ _id : req.params.uid}).populate("friends").exec((error, result) => {
		res.json(result);
	})
})

module.exports = router;
