// Schema tells MongoDB how data should look
// Model lets you create, read, update, delete that data
// Here "notes" is the name that you give to the collection were data will be of format specified by schema noteSchema

const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const noteModel = mongoose.model("notes", noteSchema);

module.exports = noteModel;
