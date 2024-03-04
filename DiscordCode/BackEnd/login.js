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

app.post('/login', async (req, res) => {
    const {name, email, password} = req.body;
    try {
        const user = await User.findOne({name, email, password});
        if (user) {
            res.status(200).send('success');
        } else {
            res.status(401).send('invalid email or password');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
