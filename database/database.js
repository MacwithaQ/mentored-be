const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  const PASSWORD = process.env.PASSWORD;
  const DATABASE = process.env.DATABASE;
  const CONNECTION_URL = `mongodb+srv://AzizMG:${PASSWORD}@cluster0.esh0o.mongodb.net/${DATABASE}?retryWrites=true&w=majority`;

  const conn = await mongoose.connect(CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;
