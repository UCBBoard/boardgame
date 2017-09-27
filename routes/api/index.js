const router = require("express").Router();
const Article = require("../../models/Articles.js");
const Game = require("../../models/Games.js");
const User = require("../../models/Users.js")
const request = require("request");
const cheerio = require("cheerio");
const Nightmare = require("nightmare")


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
	let nightmare = Nightmare ({ show: false });
	nightmare
		.goto ("https://boardgamegeek.com/geeksearch.php?action=search&objecttype=boardgame&B1=Go&q=" + req.params.name)
		.click('div#results_objectname1 > a:nth-child(1)')
		.wait(".game-header-body")
		.evaluate(function(){
			let obj = {}
			obj.name = document.getElementsByClassName("game-header-title-info")[1].children[0].children[0].innerText.trim();
			obj.minPlayers = document.getElementsByClassName("gameplay-item-primary")[0].children[0].children[0].innerText;
			obj.playtime = document.getElementsByClassName("gameplay-item-primary")[1].children[0].children[0].innerText;
			if (document.getElementsByClassName("gameplay-item-primary")[0].children[0].children[1]){
				obj.maxPlayers = document.getElementsByClassName("gameplay-item-primary")[0].children[0].children[1].innerText[1]
			}

			else {
				obj.maxPlayers = document.getElementsByClassName("gameplay-item-primary")[0].children[0].children[0].innerText;
			}

			return obj;
		})
		.end()
		.then(function(returnObj){
			res.json(returnObj)

		})

	// request("https://boardgamegeek.com/geeksearch.php?action=search&objecttype=boardgame&B1=Go&q=" + req.params.name, function(error, response, html) {
	// 	let $ = cheerio.load(html);
	// 	$("#results_objectname1").each(function(i, element) {
	// 		let link = "https://boardgamegeek.com" + $(element).children("a").attr("href");
	// 		request(link, function(error1, response1, html1) {
	// 			let $1 = cheerio.load(html1);
	// 			$1(".game-header-body").each(function(i1, element1){
	// 				// let result = {
	// 				// 	name: element1.children(".game-header-title-container").children(".game-header-title").children(".game-header-title-info").children("h1").text()
	// 				// }
	// 				res.json("element1")
	// 			})
	// 		})
	// 	})

	// })
})

// This is the route that the Gamelist Module calls when it mounts - searches the database, finds the user (passed in through params), and returns a populated list of games.
router.get("/games/:uid/mylist", (req, res) => {
	console.log("Getting user gamelist.");
	User.findOne({firebaseUid: req.params.uid}).exec((error, result) => {
		res.json(result);
	})
})

// For posting a new game linked to a users account. Called from the submit button on the add game modal in Dashboard component.
router.post("/newgame/:name/:uid", (req, res) => {
	console.log("Postin");
	let gameName = req.params.name;
	let userID = req.params.uid;
	let game = new Game ({
		title: gameName,
		user: userID
	});
	game.save();
})

// Route for checking user status and getting mongoUID.
router.get("/user/:uid", (req, res) => {
	console.log("querying DB for ID. Userid is " + req.params.uid);
	User.findOne({firebaseUid: req.params.uid}).exec((error, result) => {
		if(!error) return result;
		else return error;
	})
})

module.exports = router;
