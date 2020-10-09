const fs = require("fs");
const db = require("../db/db.json");
const { uuid } = require("uuidv4");
module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(notes);
  });

  app.post("/api/notes", function (req, res) {
    const note = {
      id: uuid(),
      title: req.body.title,
      text: req.body.text
    };

    fs.readFile("./db/db.json", "utf8", function (err, data) {
      if (err) {
        throw err;
      }
      const currentNotes = JSON.parse(data);

      currentNotes.push(note);

      fs.writeFile(
        "./db/db.json",
        JSON.stringify(currentNotes, null, 2),
        function (err) {
          if (err) {
            throw err;
          }
          res.send(db);
        }
      );
    });
  });

  app.delete("/api/notes/:id", function (req, res) {
    let noteId = req.params.id;
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) throw err;

      const currentNotesList = JSON.parse(data);
      const newNotesList = currentNotesList.filter(note => note.id != noteId);

      fs.writeFile(
        "./db/db.json",
        JSON.stringify(newNotesList, null, 2),
        function (err) {
          if (err) throw err;
          res.send(db);
        }
      );
    });
  });
};

//each routes file exports an express router
// the first route.  We are not using a filepath,  we are creating a route
