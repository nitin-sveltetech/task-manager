const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    // .connect("mongodb://localhost:27017/task-manager")
    .connect("mongodb+srv://nitinnc01:nitin123@cluster0.xifehzo.mongodb.net/task-manager")
    
    .then(() => console.log("Connected to the database"))
    .catch((error) => console.error("Database connection error:", error));
};

module.exports = connectDB;
