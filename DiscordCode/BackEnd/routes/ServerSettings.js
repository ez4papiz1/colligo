const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Server = require('./Models/ServerData');

mongoose.createConnection('mongodb://localhost:27017/colligo');

router.post('/upName', async (req, res) => {
    try {
        const {sid, nname} = req.body;
        const server = await Server.findById(sid);
        server.name = nname;
        await server.save();
        res.status(200).json({message: 'name updated', sname: server.name});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'error'});
    }
});

router.post('/dltCnl', async (req, res) => {
    try {
        const {sid, cname} = req.body;
        const server = await Server.findById(sid);
        const index = server.channels.indexOf(cname);
        if (index !== -1) {
            server.channels.splice(index, 1);
            await server.save();
            res.status(200).json({message: 'Channel deleted', serverChannels: server.channels});
        } else {
            res.status(404).json({error: 'channel not found'});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'error'});
    }
});

router.post('/banUser', async (req, res) => {
    try {
        const {sid, uid} = req.body;
        const server = await Server.findById(sid);
        const index = server.members.indexOf(uid);
        if (index !== -1) {
            server.members.splice(index, 1);
            await server.save();
            res.status(200).json({message: 'User banned', serverUsers: server.users});
        } else {
            res.status(404).json({error: 'user not found'});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'error'});
    }
});

module.exports = router;
