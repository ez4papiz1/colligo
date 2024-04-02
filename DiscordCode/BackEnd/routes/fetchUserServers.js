const express = require('express');
const mongoose = require('mongoose');
const bodyParser  = require('body-parser');
const Server = require('./Models/ServerData')
const User = require('./Models/Usermodel')


mongoose.createConnection("mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo" , { useNewUrlParser: true, useUnifiedTopology: true })
const router = express.Router();
router.get('/', (req, res) => {
        console.log('Connected to server');
        User.find({ name: "Jordan" }).then(user => {
            console.log(user);
            if (!user) {
                return res.status(404).send('User not found');
            }
            console.log(user[0]._id)
            Server.find({ members: user[0]._id }).then(servers => {
                console.log(servers);
                if(!servers) {
                    return res.status(404).send('No servers found');
                }
                res.json(servers);
            });
        }).catch(error => {
            console.error('Error fetching user:', error);
            res.status(500).send('Internal Server Error');
        });
});

module.exports = router; 