// Server ko create krna
const express = require("express");
const noteModel = require("./models/note.model");
const cors = require("cors");
const path = require("path");

const app = express();

// Middlewares
app.use(cors()); // Using middleware so we can use our own APIs created in Backend
app.use(express.json()); // Using middleware
app.use(express.static("./public")); // http://localhost:3000/assets/index-B2ds9ijj.js & http://localhost:3000/index-DH3yncXf.css

// POST /api/notes
// create new note and save data in mongo db
// req.body => {title,description}

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Note created successfully",
    note,
  });
});

// GET /api/notes
// fetch all the notes data from mongoDB and send them in the response
// find() method brings all the notes present in DB
// NOTE := it always returns the data as array of object

app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "Notes fetched successfully",
    notes,
  });
});

// DELETE /api/notes
// The id of note to be deleted is passed using params
// We have exacty function for this purpose findbyidanddelete(id) deletes the note having ID == id

app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);

  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Note deleted successfully",
  });
});

// PATCH /api/notes
// to update the description of the notes
// data that will come from req.body = {description}
// The id of note to be updated is passed using params
// We have exacty function for this purpose findbyidandupddate(id) updates the note having ID == id but pass description

app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  await noteModel.findByIdAndUpdate(id, req.body);

  res.status(200).json({
    message: "Note updated successfully",
  });
});

// Serving static files
app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
