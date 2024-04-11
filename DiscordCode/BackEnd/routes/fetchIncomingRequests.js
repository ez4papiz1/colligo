const express = require('express');
const mongoose = require('mongoose');
const FriendRequest = require('./Models/FriendRequests')

mongoose.createConnection("mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo" , { useNewUrlParser: true, useUnifiedTopology: true })
const router = express.Router();
router.get('/', async (req, res) => {
    try {
        const userId = req.session.uid;
        const incomingRequests = await FriendRequest.find({ recid: userId });
        console.log(incomingRequests);
        res.json({ incomingRequests });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching incoming requests' });
    }
});

module.exports = router;