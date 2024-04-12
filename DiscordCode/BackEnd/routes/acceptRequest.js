const express = require('express');
const mongoose = require('mongoose');
const User = require('./Models/Usermodel');
const FriendRequest = require('./Models/FriendRequests');

mongoose.createConnection("mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo", { useNewUrlParser: true, useUnifiedTopology: true });

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { sendid, recid } = req.body;

        const send = await User.findOneAndUpdate(
            { uid: sendid },
            { $addToSet: { friendlist: recid } },
            { new: true }
        );
        if (!send) {
            return res.status(404).json({ error: 'Sender not found' });
        }

        const rec = await User.findOneAndUpdate(
            { uid: recid },
            { $addToSet: { friendlist: sendid } },
            { new: true }
        );
        if (!rec) {
            return res.status(404).json({ error: 'Recipient not found' });
        }

        const request = await FriendRequest.findOneAndDelete({ sendid, recid });
        if (!request) {
            return res.status(404).json({ error: 'Friend request not found' });
        }

        res.status(200).json({ message: 'Friend request accepted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
