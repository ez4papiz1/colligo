const express = require('express');
const router = express.Router();
const ServerData = require('./Models/ServerData');
const User = require('./Models/Usermodel');

router.post('/', async (req, res) => {
    try {
        const serverId = req.body.serverId;
        const newServerName = req.body.newServerName;
        const updatedServer = await ServerData.findOneAndUpdate({ sid: serverId }, { name: newServerName }, { new: true });
        if (updatedServer) {
            res.status(200).send("Server name changed successfully");
        } else {
            res.status(404).send("Server not found");
        }
    } catch (error) {
        console.error('Error changing server name:', error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;