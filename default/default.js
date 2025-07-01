// default.js
const Lecture = require('../model/Lecture');
const Data = require('../Data');

const data = async (req, res) => {
    
    await Lecture.deleteMany({});
    await Lecture.insertMany(Data);
};
module.exports = data;



