const express = require('express');
const mongoose = require('mongoose');
const ServerData = require('./Models/ServerData');

mongoose.createConnection("mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo" , { useNewUrlParser: true, useUnifiedTopology: true })

const router = express.Router();

router.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'}); 
    res.write('<!DOCTYPE html>');
    res.write('<html>');
    res.write('<head>');
    res.write('<title>Server Creation</title>');
    res.write('</head>');
    res.write('<body>');
    res.write('<h1>Server Created</h1>');
    res.write('<p>' + req.query.serverName + '</p>'); 
    res.write('<p>Server Created</p>');
    res.write('<a href="/displayServer">Return to server page to see new channel</a>'); 
    res.write('</body>');
    res.write('</html>');
    ServerData.find({name: 'TestServerJordan'}).then((result) => {
        if (result.length > 0) {
            const server = result[0];
            server.channels.push({ name: req.query.channelName, messages: ['test'] });
            server.save().then(() => {
            console.log('Channel created successfully');
            }).catch((error) => {
            console.error('Failed to create channel:', error);
            });
        } else {
            console.error('Server not found');
        }
    });

});

module.exports = router; 