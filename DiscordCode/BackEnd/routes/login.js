const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const Usermodel = require('./Models/Usermodel');
const bodyParser = require('body-parser');

mongoose.connect("mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo", { useNewUrlParser: true, useUnifiedTopology: true });

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

router.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
}));

router.post('/', async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        Usermodel.findOne({ email: email, password: password} ).then(function(user) {
            req.session.name = user.name;
            req.session.email = user.email;
            req.session.save();
            console.log('Login successful');
            res.redirect('/ServerPage');
        }).catch(error => {
            console.error('Error logging in:', error);
            next(err);
        });
    } catch (err) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: 'Internal Server Error'});
});

module.exports = router;
