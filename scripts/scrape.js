const cheerio = require("cheerio");
const axios = require("axios");
//const db = require("../models")


const scrape = function () {
  axios.get("https://npr.org/sections/music-news").then(function (response) {

    var $ = cheerio.load(response.data);

    var results = [];

    $("article").each(function (i, element) {
      var title = $(element).find("h2.title").text().trim();
      var summary = $(element).find("a").text().replace("/\n + \n +").trim();
      var link = $(element).find("a").attr("href");


      results.push({
        title: title,
        summary: summary,
        link: link
      });
    });
    console.log(results);

    db.Article.create(result).then(function (dbArticle) {
      // View the added result in the console
      console.log(dbArticle);
    })
      .catch(function (err) {
        // If an error occurred, log it
        console.log(err);
      });
  });
}

scrape();
module.exports = scrape