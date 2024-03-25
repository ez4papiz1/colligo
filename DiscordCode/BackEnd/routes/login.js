const express = require('express');
const mongoose = require('mongoose');


mongoose.createConnection('mongodb://localhost:27017/colligo');


const router = express.Router();


router.post('/', async (req, res) => {
    res.render('login');
    const {name, email, password} = req.body;
    try {
        const user = await User.findOne({name, email, password});
        if (user) {
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