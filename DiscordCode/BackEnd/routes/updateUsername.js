const express = require('express');
const mongoose = require('mongoose');
const Usermodel = require('./Models/Usermodel');
const bodyParser = require('body-parser');

 mongoose.createConnection("mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo" , { useNewUrlParser: true, useUnifiedTopology: true });


const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

router.post('/', async (req, res, next) => {
    try {
        const uid = req.session.uid;
        const username = req.body['new-username'];
        Usermodel.findOneAndUpdate({ uid: uid}, {name: username}).then(function(user) {
            res.redirect('/AccountSettings');
        }).catch(error => {
            console.error('Wrong password:', error);
            next(error);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating password' });
    }
});

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: 'Internal Server Error'});
});

module.exports = router;