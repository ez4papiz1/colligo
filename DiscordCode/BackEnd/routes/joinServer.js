const express = require('express');
const mongoose = require('mongoose');
const ServerData = require('./Models/ServerData');
const User = require('./Models/Usermodel');

mongoose.createConnection("mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo" , { useNewUrlParser: true, useUnifiedTopology: true })

const router = express.Router();

router.post('/', async (req, res) => {
    try{
        const server = await ServerData.findOne({ sid: req.body.serverId});
        const user = await User.findOne({ uid: req.session.uid});
        const exists = server.members.some(memberId => memberId.equals(user._id));
        if (!exists) {
            server.members.push(user);
            await server.save().then(() => {
                console.log('Joined server successfully');
                }).catch((error) => {
                console.error('Failed to join server:', error);
                });
            } else {
                console.error('Already part of the server');
            }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router; 