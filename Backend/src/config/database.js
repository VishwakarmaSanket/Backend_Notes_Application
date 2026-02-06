const mongoose = require("mongoose");

const connectToDb = () => {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to DB ✅");
  });
};

module.exports = connectToDb;
