const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://localhost:27017/colligo');
const db = mongoose.connection;

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const uid = req.body.uid;
        const friendname = req.body.friendname;

        const friend = await User.findOne({name: friendname});
        if (!friend){
            return res.status(404).send('user not found');
        }
        
        if (User.friends.includes(friend.name)){
            return res.status(400).send('already friends');
        }

        User.friendlist.push(friend.name);
        await User.save();     
        res.status(200).send('friend added successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('error');
    }
});

module.exports = router;
