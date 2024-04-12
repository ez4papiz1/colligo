const express = require('express');
const mongoose = require('mongoose');
const FriendRequest = require('./Models/FriendRequests')

mongoose.createConnection("mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo" , { useNewUrlParser: true, useUnifiedTopology: true })
const router = express.Router();
router.post('/', async (req, res) => {
    try {
        const sendId = req.body.sendid;
        const recId = req.body.recid;
        const request = await FriendRequest.findOneAndDelete({ sendid: sendId, recid: recId });
        if (!request) {
            return res.status(404).json({ error: 'Friend request not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;