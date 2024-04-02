const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        res.render('ServerPage');
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;