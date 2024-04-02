const express = require('express');
const mongoose = require('mongoose');
const User = require('./Models/User.model');

mongoose.createConnection('mongodb://localhost:27017/colligo');


const router = express.Router();

router.post('/', async (req, res) => {
    res.render('account_settings');
    try {
        const uid = req.body.uid;
        const updated = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };
        await User.findByIdAndUpdate(uid, updated);
        res.status(200).json({message: 'name updated', sname: User.name});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'error'});
    }
});

module.exports = router;