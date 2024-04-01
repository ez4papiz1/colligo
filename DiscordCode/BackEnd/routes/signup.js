const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);

mongoose.createConnection('mongodb://localhost:27017/colligo');


const router = express.Router();
router.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

router.post('/', async (req, res) => {
    res.render('signup');
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        await newUser.save();

        req.session.user = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email
        };
        
        res.status(201).json({message: 'name updated successfully', nname: User.name});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'error'});
    }
});

module.exports = router;
