const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/colligo');
const db = mongoose.connection;
const express = require('express')
const app = express();
const port = 3000;

app.use(express.json());

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

const login = require('./DiscordCode/BackEnd/routes/login.js');
const signup = require('./DiscordCode/BackEnd/routes/signup.js');
app.use('/signup', signup);
app.use('/login', login);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})