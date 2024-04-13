const express = require('express');
const router = express.Router();
const ServerData = require('./Models/ServerData');
const User = require('./Models/Usermodel');

router.post('/', async (req, res) => {
    try {
        const serverId = req.body.serverId;
        const adminUsername = req.body.adminUsername;
        const user = await User.findOne({ name: adminUsername });
        const server = await ServerData.findOne({ sid: serverId });
        const exists = server.members.some(memberId => memberId.equals(user._id));
        const already = server.admins.some(adminName => adminName === user.name);
        if (!exists){
            console.error('Not a member');
        }else if (already){
            console.error('Already an admin of the server');
        }else if (user) {
            const updatedServer = await ServerData.findOneAndUpdate(
                { sid: serverId },
                { $addToSet: { admins: user.name } },
                { new: true }
            );
            if (updatedServer) {
                res.json(server.admins);
            } else {
                res.status(404).send("Server not found");
            }
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error('Error adding admin:', error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;