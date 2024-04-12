const express = require('express');
const mongoose = require('mongoose');
const bodyParser  = require('body-parser');
const Server = require('./Models/ServerData')
const User = require('./Models/Usermodel')


mongoose.connect("mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo" , { useNewUrlParser: true, useUnifiedTopology: true })
const router = express.Router();
router.get('/', async (req, res) => {
    try {
        const serverName = req.query.serverName;
        const servers = await Server.find({ name: serverName });
        console.log(servers);
        res.render('searchResults', { servers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching servers' });
    }
});
module.exports = router;