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
    res.render('login');
    const {name, email, password} = req.body;
    try {
        const user = await User.findOne({name, email, password});
        if (user) {
            req.session.user = {
                id: user._id,
                name: user.name,
                email: user.email
            };
            res.status(200).json({message: 'login successful', id: User.uid});
        } else {
            res.status(401).json({error: 'invalid email or password'});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'error'});
    }
});

module.exports = router;
