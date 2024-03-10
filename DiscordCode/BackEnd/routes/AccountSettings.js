const express = require('express');
const mongoose = require('mongoose');
const user = require('./models/User');

mongoose.connect('mongodb://localhost:27017/colligo');
const db = mongoose.connection;

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const uid = req.body.uid;
        const updated = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };
        await user.findByIdAndUpdate(uid, updated);
        res.status(200).send('success');
    } catch (err) {
        console.error(err);
        res.status(500).send('error');
    }
});

module.exports = router;