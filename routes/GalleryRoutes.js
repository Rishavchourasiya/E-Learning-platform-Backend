const express = require('express');
const router = express.Router();
const upload = require('../moddleware/videomiddelware');
 
const Gallery = require('../model/Gallery'); 

router