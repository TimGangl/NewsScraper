const cheerio = require("cheerio");
const axios = require("axios");
//const db = require("../models")


const scrape = function () {
  axios.get("https://npr.org/sections/music-news").then(function (response) {

    const $ = cheerio.load(response.data);

    var results = [];

    $("article.item").each(function (i, element) {
      var title = $(element).find("h2.title").text().trim();
      var summary = $(element).find("p.teaser").text().trim();
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
        return response.json(err);
        // If an error occurred, log it
        console.log(err);
      });
  });
}

scrape();
module.exports = scrape