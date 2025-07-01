const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const db = process.env.mongoURL;
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected successfully");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});