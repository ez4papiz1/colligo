const express = require('express');
const router = express.Router();
const ServerData = require('./Models/ServerData');
const User = require('./Models/Usermodel');

router.post('/', async (req, res) => {
    try {
        const serverId = req.body.serverId;
        const memberUsername = req.body.memberUsername;
        const user = await User.findOne({ name: memberUsername });
        const server = await ServerData.findOne({ sid: serverId });
        const exists = server.members.some(memberId => memberId.equals(user._id));
        if (!exists){
            console.error('Not a member');
        }else if (user) {
            const updatedServer = await ServerData.findOneAndUpdate(
                { sid: serverId },
                { $pull: { members: user._id } },
                { $pull: { admins: user.name } },
                { new: true }
            );
            if (updatedServer) {
                res.json(server.members);
            } else {
                res.status(404).send("Server not found");
            }
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error('Error deleting member:', error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;