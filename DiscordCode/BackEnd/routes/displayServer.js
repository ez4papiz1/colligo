const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        if (!req.session.name) {
            res.redirect('/login');
        }
        const username = req.session.name;
        req.session.save();
        res.render('ServerPage',{ username: username });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;