const mongoose = require("mongoose");

const connectToDB = async () => {
  const url = process.env.MONGO_URI;
  try {
    const con = await mongoose.connect(url);
    console.log(`Connected:${con.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectToDB;
