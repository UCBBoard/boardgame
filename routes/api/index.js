const router = require("express").Router();
const Article = require("../../models/article.js");
const request = require("request");
const cheerio = require("cheerio");

router.get("/news/scrape", function(req, res){
	request("https://www.reddit.com/r/boardgames/top/?sort=top&t=day", function(error, response, html) {
		let $ = cheerio.load(html);
		$("p.title").each(function(i, element) {
			let article = new Article({
					title: $(element).children("a").text(),
					link: $(element).children("a").attr("data-href-url"),
				})
			article.save();
		})

		Article.find().exec(function(error, result){
			res.json(result.slice(0,5))
		})
	})
})


router.get("/news", function(req, res){
	Article.find().exec(function(error, result){
		console.log(result);
	})
})





module.exports = router;
