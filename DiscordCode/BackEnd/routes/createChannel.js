const express = require('express');
const mongoose = require('mongoose');
const ServerData = require('./Models/ServerData');

mongoose.createConnection("mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo" , { useNewUrlParser: true, useUnifiedTopology: true })

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const server = await ServerData.findOne({ name: req.query.serverName});

        if (server) {
            server.channels.push({ name: req.query.channelName, messages: [] });
            await server.save().then(() => {
                console.log('Channel created successfully');
                }).catch((error) => {
                console.error('Failed to create channel:', error);
                });
            } else {
                console.error('Server not found');
            }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router; 