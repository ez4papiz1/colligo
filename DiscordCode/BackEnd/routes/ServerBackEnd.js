const express = require('express');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/colligo');
const db = mongoose.connection;

const router = express.Router();

router.get('/', (req, res) => {
    res.render('ServerPage');
});

module.exports = router;