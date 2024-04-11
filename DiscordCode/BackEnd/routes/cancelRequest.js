const express = require('express');
const mongoose = require('mongoose');
const bodyParser  = require('body-parser');
const Server = require('./Models/ServerData')
const User = require('./Models/Usermodel')


mongoose.createConnection("mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo" , { useNewUrlParser: true, useUnifiedTopology: true })
const router = express.Router();
router.post('/', async (req, res) => {
    try {
        const sendId = req.body.sendid;
        const recId = req.body.recid;
        const sender = await User.findByIdAndUpdate(sendId, { $addToSet: { friendlist: recId } }, { new: true });
        if (!sender) {
            return res.status(404).json({ error: 'Sender not found' });
        }
        const recipient  = await User.findByIdAndUpdate(recId, { $addToSet: { friendlist: sendId } }, { new: true });
        if (!recipient) {
            return res.status(404).json({ error: 'Recipient not found' });
        }
        const request = await FriendRequest.findByIdAndDelete({ sendid: sendId }, {recid: recId});
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