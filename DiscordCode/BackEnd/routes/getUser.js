const express = require('express');
const mongoose = require('mongoose');
const User = require('./Models/Usermodel')


mongoose.connect("mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo" , { useNewUrlParser: true, useUnifiedTopology: true })
const router = express.Router();
router.get('/', (req, res) => {
    const uid = req.session.uid;
    User.findOne({ uid: uid }).then(user => {
        res.json(user);
    }).catch(error => {
        console.error('Error fetching uid:', error);
        res.status(500).send('An error occurred');
    });
});
module.exports = router; 