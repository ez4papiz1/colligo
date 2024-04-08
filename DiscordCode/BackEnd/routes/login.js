const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const User = require('./Models/Usermodel');

mongoose.connect("mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo", { useNewUrlParser: true, useUnifiedTopology: true });

const router = express.Router();
router.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
}));

router.post('/', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        User.findOne({ email: email, password: password }).then(user => {
            req.session.name = user.name;
            req.session.save();
            console.log('Login successful');
            res.redirect('/ServerPage')
        }).catch(error => {
            console.error('Error logging in:', error);
            res.status(500).send('An error occurred');
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
});

module.exports = router;
