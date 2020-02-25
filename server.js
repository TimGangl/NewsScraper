const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const axios = require("axios");
const cheerio = require("cheerio");

const db = require("./models");

const PORT = 3000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Set Handlebars
const Handlebars = require('handlebars')
const hbs = require("express-handlebars");
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

app.engine("handlebars", hbs({ defaultLayout: "main", handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set("view engine", "handlebars");


// Connect to Mongo DB
mongoose.connect("mongodb://localhost/scraper", { useNewUrlParser: true }, function () {
  console.log("mongo connected")
});

//Routes
app.get("/", (req, res) => {
  db.Article.find({}, function (err, found) {
    if (err) {
      console.log(err);
    }
    res.render("index", { found });
  });
});

app.get("/saved", (req, res) => {
  db.Article.find({}, function (err, found) {
    if (err) {
      console.log(err);
    }
    res.render("saved");
  })
});




//GET route for scraping the site
app.get("/scrape", function (req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://npr.org/sections/music-news").then(function (response) {
    var $ = cheerio.load(response.data);

    $("article.item").each(function (i, element) {
      const result = {};

      result.title = $(this).find("h2.title").text().trim();
      result.summary = $(this).find("p.teaser").text().trim();
      result.link = $(this).find("a").attr("href");
      result.date = $(this).find("span.date").text().trim();

      // console.log(result);


      // Create a new Article using the `result` object built from scraping
      db.Article.create(result).then(function (dbArticle) {
        // View the added result in the console
        console.log(dbArticle);
      })
        .catch(function (err) {
          // If an error occurred, log it
          console.log(err);
        });

    });

  });
});

//start server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
