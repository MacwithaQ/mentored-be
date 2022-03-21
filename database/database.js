const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  const PASSWORD = process.env.PASSWORD;
  const CONNECTION_URL = `mongodb+srv://mkalansari:${PASSWORD}@coded.g97iy.mongodb.net/test?authSource=admin&replicaSet=atlas-pgw0fm-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`;

  const conn = await mongoose.connect(CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;
