const express = require('express');
const mongoose = require('mongoose');
const bodyParser  = require('body-parser');
const Server = require('./Models/ServerData')
const User = require('./Models/Usermodel')


mongoose.connect("mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo" , { useNewUrlParser: true, useUnifiedTopology: true })
const router = express.Router();
router.get('/:serverId', (req, res) => {
    const serverId = req.params.serverId;
    Server.findById(serverId).then (result => {
        User.find({ _id: result.members } ).then(users => {
            const memberNames = users.map(user => user.name);
            const modifiedResult = {
                ...result.toObject(),
                members: memberNames
            };
            res.json(modifiedResult);
        });
    });   
});

module.exports = router; 