const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Server = require('./models/Server.model');

mongoose.createConnection('mongodb://localhost:27017/colligo');
const db = mongoose.connection;

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

router.post('/updDesc', async (req, res) => {
    try {
        const {sid, ndesc} = req.body;
        const server = await Server.findById(sid);
        server.description = ndesc;
        await server.save();
        res.status(200).json({message: 'description updated', sdesc: server.description});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'error'});
    }
});

router.post('/banUser', async (req, res) => {
    try {
        const {sid, uid} = req.body;
        const server = await Server.findById(sid);
        const index = server.users.indexOf(uid);
        if (index !== -1) {
            server.users.splice(index, 1);
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
