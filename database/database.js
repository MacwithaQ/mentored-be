const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  const DATABASE = process.env.DATABASE;
  const PASSWORD = process.env.PASSWORD;
  const CONNECTION_URL = `mongodb+srv://mkalansari:${PASSWORD}@coded.g97iy.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;

  const conn = await mongoose.connect(CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;
