const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const db = process.env.MONGO_URI;

mongoose.connect(db)
  .then(() => console.log('✅ MongoDB connected...'))
  .catch(err => console.error('❌ MongoDB connection failed:', err));
