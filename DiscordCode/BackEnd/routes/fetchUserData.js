const express = require('express');
const mongoose = require('mongoose');
const bodyParser  = require('body-parser');
const Server = require('./Models/ServerData')
const User = require('./Models/Usermodel')


mongoose.createConnection("mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo" , { useNewUrlParser: true, useUnifiedTopology: true })
const router = express.Router();
router.get('/user', async (req, res) => {
    try {
        const userId = req.session.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ username: user.name, email: user.email, password: user.password });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching user information' });
    }
});

module.exports = router;