const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const Usermodel = require('./Models/Usermodel');
const bodyParser = require('body-parser');

mongoose.createConnection("mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo", { useNewUrlParser: true, useUnifiedTopology: true });



const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

router.use(session({
    secret : 'secretkey',
    resave : false,
    saveUninitialized : false,
}));

router.post('/', async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        Usermodel.findOne({ email: email, password: password} ).then(function(user) {
            req.session.uid = user.uid;
            req.session.name = user.name;
            req.session.email = user.email;
            req.session.password = user.password;
            req.session.save();
            console.log(user._id);
            console.log('Login successful');
            res.redirect('/ServerPage');
        }).catch(error => {
            console.error('Wrong username/password:', error);
            next(error);
        });
    } catch (err) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    console.error(err.stack);
    req.session.status = 'Wrong email/password';
    res.redirect('/login');

});

module.exports = router;