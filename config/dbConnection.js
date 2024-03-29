const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Database not connected"));
db.once("open", (error) => {
  if (error) {
    console.log("Error in DB connection", error);
    return false;
  }
  console.log("DB connected Successfully...");
});

module.exports = db;
