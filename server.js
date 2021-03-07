// dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
// array to save notes
const noteArr = require("./db/db.json");

// express
const app = express();
const PORT = process.env.PORT || 3000;

//  this sets up the express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

//   start the server and listening
app.listen(PORT, function () {
  console.log("listening on PORT " + PORT);
});
// routes for express app
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// returns all notes
app.get("/api/notes", function (req, res) {
  return res.json(JSON.parse(fs.readFileSync("./db/db.json")));
});

// route used to save note to db.json
app.post("/api/notes", function (req, res) {
  let newNote = req.body;
  console.log("new note: ", newNote);

  noteArr.push(newNote);
  // sets id property of newNote
  newNote.id = noteArr.indexOf(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(noteArr));

});
