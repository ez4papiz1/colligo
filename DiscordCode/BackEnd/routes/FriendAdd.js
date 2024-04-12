const express = require('express');
const mongoose = require('mongoose');
const User = require('./Models/Usermodel');
const FriendRequests = require('./Models/FriendRequests');
const bodyParser = require('body-parser');


mongoose.createConnection("mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo", { useNewUrlParser: true, useUnifiedTopology: true });


const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

router.post('/', async (req, res) => {
    try {
        const sendId = req.session.uid;
        const recId = req.body.friendID; 
        console.log(req.body);
        const friend = await User.findOne({ uid: recId });
        console.log(friend);
        if (!friend) {
            return res.status(404).json({error: 'User not found'});
        }

        const sent = await FriendRequests.findOne({ sendId: sendId }, {recId: recId});
        if (sent) {
            return res.status(404).json({error: 'Request already sent'});
        }
        const user = await User.findOne({ uid: sendId });

        if (user.friendlist.includes(friend.uid)) {
            return res.status(400).json({error: 'Already friend'});
        }

        const newReq = new FriendRequests({
            sendid: sendId,
            recid: recId,
            recname: friend.name,
            sendname: user.name,
        });
        await newReq.save();
       
        res.redirect('/addFriend');
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'error'});
    }
});

module.exports = router;