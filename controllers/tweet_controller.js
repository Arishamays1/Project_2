const express = require('express');
const router = express.Router();

//-----------Models--------------
const db = require('../models')

// GET ALL TWEETS ROUTE
router.get('/tweet', async (req, res, next) => {
    try {
        const tweet = await db.Tweet.find({});
        const context = {tweet}
        console.log(tweet);
        return res.render('index.ejs', context);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
});



//---------EXPORTS-----------
module.exports = router;