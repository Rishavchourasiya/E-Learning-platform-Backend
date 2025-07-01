const mongoose = require('mongoose');
const LectureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true }
});

const Lecture = mongoose.model('Lecture', LectureSchema);
module.exports = Lecture;



























