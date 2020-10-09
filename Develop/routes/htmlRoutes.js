const path = require("path");

module.exports = app => {
  app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });

  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
//each routes file exports an express router
//chceck lastest verrsion on repo.
