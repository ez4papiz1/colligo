const express = require('express');
const mongoose = require('mongoose');
const User = require('./Models/Usermodel');

 mongoose.createConnection("mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo" , { useNewUrlParser: true, useUnifiedTopology: true });


const router = express.Router();

router.get('/', async (req, res) => {
    const username = req.session.name;
    req.session.save();
    res.render('account_settings', { username: username });
     try {

        const uid = req.body.uid;
        const updated = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };
        await User.findByIdAndUpdate(uid, updated);
        res.status(200).json({message: 'name updated', sname: User.name});
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'error'});
    } 
});

module.exports = router;