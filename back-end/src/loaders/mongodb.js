const mongoose = require("mongoose");

const startDB = async () => {
  mongoose.set("strictQuery", true);

  await mongoose.connect(
    "mongodb://mongo:" +
      process.env.RAILWAYDB_PASSWORD +
      "@containers-us-west-86.railway.app:6213"
  );
};

module.exports = startDB;
