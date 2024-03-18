const express = require('express');
const mongoose = require('mongoose');

mongoose.createConnection('mongodb://localhost:27017/colligo');
const db = mongoose.connection;

const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        await newUser.save();
        res.status(201).send('success');
        res.status(201).json({message: 'name updated successfully', nname: User.name});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'error'});
    }
});

module.exports = router;
