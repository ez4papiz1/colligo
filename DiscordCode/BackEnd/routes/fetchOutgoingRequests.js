const express = require('express');
const mongoose = require('mongoose');
const FriendRequest = require('./Models/FriendRequests')

mongoose.createConnection("mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo" , { useNewUrlParser: true, useUnifiedTopology: true })
const router = express.Router();
router.get('/', async (req, res) => {
    try {
        const userId = req.session.uid;
        const outgoingRequests = await FriendRequest.find({ sendid: userId });
        res.json({ outgoingRequests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching outgoing requests' });
    }
});

module.exports = router;