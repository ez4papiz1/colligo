const express = require('express');
const mongoose = require('mongoose');
const bodyParser  = require('body-parser');
const Server = require('./Models/ServerData')
const User = require('./Models/Usermodel')


mongoose.connect("mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo" , { useNewUrlParser: true, useUnifiedTopology: true })
const router = express.Router();
router.get('/', (req, res) => {
    const serverName = req.query.serverName;
    Server.find({ name: serverName }).then(servers => {
        res.render('searchResults', { servers });
    }).catch(error => {
        console.error('Error fetching server data:', error);
        res.status(500).send('An error occurred');
    });
});
module.exports = router; 