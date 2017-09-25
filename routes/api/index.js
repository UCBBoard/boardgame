const router = require("express").Router();
const Article = require("../../models/Articles.js");
const request = require("request");
const cheerio = require("cheerio");

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

router.get("/games/:name", function(req, res){
	request("https://boardgamegeek.com/geeksearch.php?action=search&objecttype=boardgame&B1=Go&q=" + req.params.name, function(error, response, html) {
		let $ = cheerio.load(html);
		$("#results_objectname1").each(function(i, element) {
			let link = "https://boardgamegeek.com" + $(element).children("a").attr("href");
			request(link, function(error1, response1, html1) {
				let $1 = cheerio.load(html1);
				$1(".game-header-body").each(function(i1, element1){
					// let result = {
					// 	name: element1.children(".game-header-title-container").children(".game-header-title").children(".game-header-title-info").children("h1").text()
					// }
					res.json("element1")
				})
			})
		})

	})
})





module.exports = router;
