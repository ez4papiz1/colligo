const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

mongoose.connect('mongodb://localhost:27017/colligo');
const db = mongoose.connection;

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

app.use(express.json());

app.use(express.static(path.join(__dirname, 'frontEnd')));

app.post('/register', async (req, res) => {
    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });

        await newUser.save();

        res.status(201).send('success');
    } catch (err) {
        console.error(err);
        res.status(500).send('error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
console.log(__dirname);
