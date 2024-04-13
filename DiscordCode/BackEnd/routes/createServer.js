const express = require('express');
const mongoose = require('mongoose');
const ServerData = require('./Models/ServerData');
const User = require('./Models/Usermodel');

mongoose.createConnection("mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo", { useNewUrlParser: true, useUnifiedTopology: true });

const router = express.Router();

router.get('/', async (req, res) => {
    if (!req.session.name) {
        res.redirect('/login');
    }
    const username = req.session.name;

    try {
        const user = await User.findOne({ name: username });

        const serverData = await ServerData.create({
            sid: Math.floor(100000 + Math.random() * 900000),
            name: req.query.serverName,
            members: [user],
            admins: [user.name],
            channels: [],
        });

        const server = await serverData.findOne({ name: req.query.serverName });

        if (server) {
            user.servers.push(server);
            await user.save();
        } else {
            return res.status(404).send("Server not found");
        }

        res.json(server);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
