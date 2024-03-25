const express = require('express');
const mongoose = require('mongoose');

mongoose.createConnection('mongodb://localhost:27017/colligo');


const router = express.Router();


router.post('/', async (req, res) => {
    res.render('signup');
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        await newUser.save();
        res.status(201).json({message: 'name updated successfully', nname: User.name});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'error'});
    }
});

module.exports = router;