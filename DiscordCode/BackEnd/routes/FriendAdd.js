const express = require('express');
const mongoose = require('mongoose');
const User = require('./Models/Usermodel');
const FriendRequests = require('./Models/FriendRequests');
const bodyParser = require('body-parser');


mongoose.createConnection('mongodb+srv://artem:testpass@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo');


const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

router.post('/', async (req, res) => {
    try {
        const sendId = req.session.uid;
        const recId = req.body.friendID; 
        console.log(req.body);
        // Retrieve the user document from the database
        const friend = await User.findOne({ uid: recId });
        console.log(friend);
        if (!friend) {
            return res.status(404).json({error: 'User not found'});
        }

        //Check if request already send
        const sent = await FriendRequests.findOne({ sendId: sendId }, {recId: recId});
        if (sent) {
            return res.status(404).json({error: 'Request already sent'});
        }
        const user = await User.findOne({ uid: sendId });

        if (user.friendlist.includes(friend.uid)) {
            return res.status(400).json({error: 'Already friend'});
        }

        // Add the friend's ID to the user's friendlist and save the update
        const newReq = new FriendRequests({
            sendid: sendId,
            recid: recId,
            acc: false,
        });
        await newReq.save();
       
        res.status(200).json({message: 'request sent', fname: friend.name});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'error'});
    }
});

module.exports = router;