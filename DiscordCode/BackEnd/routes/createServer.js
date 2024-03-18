const express = require('express');
const mongoose = require('mongoose');
const ServerData = require('./Models/ServerData');

mongoose.createConnection("mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo" , { useNewUrlParser: true, useUnifiedTopology: true })

const router = express.Router();

router.get('/', (req, res) => {
    res.write(req.query.serverName);
    res.write(' ');
    res.write('Server Created');
    ServerData.create({
        sid: Math.floor(Math.random() * 100),
        name: req.query.serverName,
        channels: ['general','help'], //default channels
        members: ['Jordan','John'], //default members
        messages: ['Hi','Hello'] //default messages
    })
    res.end();
});
module.exports = router; 