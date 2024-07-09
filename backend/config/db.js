const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log("rr", error);
  }
};
module.exports = connectDB;
