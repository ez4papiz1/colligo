// Home.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Initialize express app
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/colligo', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Optionally, if your EJS files are not in the default 'views' directory, set the views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, images) from the 'public' directory
app.use(express.static(path.join(__dirname, 'FrontEnd')));

// Middleware to parse request bodies (if you're accepting form data)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define route for the home page using GET request
app.get('/', (req, res) => {
  const pageData = {
    title: 'Welcome to Colligo',
    message: 'This is your home for collaboration and productivity.'
  };
  res.render('home', pageData); // Make sure you have a home.ejs file in your views directory
});

// Additional routes can be added here

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
