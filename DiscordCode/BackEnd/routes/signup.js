const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const Usermodel = require('./Models/Usermodel');
const bodyParser = require('body-parser');

mongoose.createConnection('mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo');


const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

router.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
}));

function generateUid() {
    return Math.floor(100000 + Math.random() * 900000);
}
router.post('/', async (req, res, next) => {    
    try {
        let uid;
        let existingUser;
        do {
            uid = generateUid();
            console.log(uid);
            existingUser = await Usermodel.findOne({ uid: uid });
        } while (existingUser);
        const newUser = new Usermodel({
            uid: uid,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        await newUser.save();
        req.session.name = newUser.name;
        req.session.email = newUser.email;
        req.session.save();
        res.redirect('/ServerPage');
    } catch (err) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({error: 'Internal Server Error'});
});

module.exports = router;
