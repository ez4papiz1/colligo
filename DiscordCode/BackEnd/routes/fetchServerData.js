const express = require('express');
const mongoose = require('mongoose');
const bodyParser  = require('body-parser');

const ServerDataSchema = new mongoose.Schema({
    sid: {
        type: Number,
    },
    name: {
        type: String,
    },
    members: [{
        type: String,
    }],
    channels: [{
        type: String,
    }],
    messages: [{
        type: String,
    }]
});


mongoose.createConnection("mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo" , { useNewUrlParser: true, useUnifiedTopology: true })

const Server = mongoose.model('servers', ServerDataSchema);

const router = express.Router();
router.get('/', (req, res) => {
    Server.find({name : 'TestServerJordan'}).then (result => {
        res.json(result);
    });   
});

module.exports = router; 