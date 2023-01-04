const mongoose = require("mongoose");

const startDB = async () => {
  mongoose.set("strictQuery", true);

  await mongoose.connect(
    "mongodb+srv://danyelica:" +
      process.env.DB_PASSWORD +
      "@cluster0.msfnmi0.mongodb.net/test"
  );
};

module.exports = startDB;
