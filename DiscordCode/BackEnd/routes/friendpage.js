const express = require('express');
const mongoose = require('mongoose');
const bodyParser  = require('body-parser');
const Server = require('./Models/ServerData')
const User = require('./Models/Usermodel')


mongoose.connect("mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo" , { useNewUrlParser: true, useUnifiedTopology: true })
const router = express.Router();
router.get('/', (req, res) => {
    const username = req.session.name;
    console.log('Username:', username);
    req.session.save();
    User.findOne({ name: username }).then(user => {
        console.log('User data fetched:', { user });
        res.render('friend_page', { user });
    }).catch(error => {
        console.error('Error fetching user data:', error);

});
});
module.exports = router; 