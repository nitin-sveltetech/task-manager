const mongoose = require("mongoose");
const DATABASE = process.env.DATABASE

const connectDB = () => {
  mongoose
    // .connect("mongodb://localhost:27017/task-manager")
    .connect(`${DATABASE}`)
    
    .then(() => console.log("Connected to the database"))
    .catch((error) => console.error("Database connection error:", error));
};

module.exports = connectDB;
