module.exports = Router => {
  Router.get("/", (req, res) => {
    res.render("index");
  });

  Router.get("/saved", (req, res) => {
    res.render("saved");
  });
}