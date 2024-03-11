const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/colligo');
const db = mongoose.connection;

const router = express.Router();

router.post('/addFriend', async (req, res) => {
    try {
        const uid = req.body.uid; 
        const friendUsername = req.body.friendname; 

        // Retrieve the user document from the database
        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Retrieve the friend's user document by username
        const friend = await User.findOne({ username: friendUsername });
        if (!friend) {
            return res.status(404).send('Friend not found');
        }

        // Check if the friend is already in the user's friendlist
        if (user.friendlist.includes(friend.uid)) {
            return res.status(400).send('Already friends');
        }

        // Add the friend's ID to the user's friendlist and save the update
        user.friendlist.push(friend.uid);
        await user.save();

        res.status(200).send('Friend added successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding friend');
    }
});

module.exports = router;
