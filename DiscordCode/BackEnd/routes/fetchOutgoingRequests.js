const express = require('express');
const mongoose = require('mongoose');
const bodyParser  = require('body-parser');
const Server = require('./Models/ServerData')
const User = require('./Models/Usermodel')


mongoose.createConnection("mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo" , { useNewUrlParser: true, useUnifiedTopology: true })
const router = express.Router();
router.get('/outgoing/:userId', async (req, res) => {
    try {
        const userId = req.params.uid;
        const outgoingRequests = await FriendRequest.find({ sendid: userId });
        res.status(200).json({ outgoingRequests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching outgoing requests' });
    }
});

module.exports = router;