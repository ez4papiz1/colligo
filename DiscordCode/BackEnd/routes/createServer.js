const express = require('express');
const mongoose = require('mongoose');
const ServerData = require('./Models/ServerData');
const User = require('./Models/Usermodel');

mongoose.createConnection("mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo" , { useNewUrlParser: true, useUnifiedTopology: true })

const router = express.Router();

router.get('/', (req, res) => {
    if (!req.session.name) {
        res.redirect('/login');
    }
    const username = req.session.name;
    req.session.save();
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
    res.write('<a href="/displayServer">Return to server page to see new server</a>'); 
    res.write('</body>');
    res.write('</html>');
   
    ServerData.create({
        sid: Math.floor(Math.random() * 100),
        name: req.query.serverName,
        members: ['660b196ff1e5954cd22ea261'],  
        channels: [{name: 'General', messages: ['Hello']}],
    });
    
    ServerData.findOne({ name: req.query.serverName }).then(server =>
        User.findOne({ name: username }).then(user => {
            console.log(server.name)
            user.servers.push(server._id);
            user.save();
        })
    );

    res.end();
});
module.exports = router; 