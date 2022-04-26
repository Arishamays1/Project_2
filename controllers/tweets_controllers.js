const express = require('express');
const router = express.Router();
const db = require('../models')

//---------ALL TWEETS ROUTE--------
router.get('/', async (req, res, next) => {
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

//-------NEW TWEET ROUTE-----------
router.get('/newtweet', (req, res) => {
    res.render('new')
})

//------SHOW TWEET ROUTE----------
router.get('/:id', (req, res) => {
    let tweetId = req.params.id
    console.log('hitting show route')
    const context = {
        oneTweet: tweets[tweetId],
        message: 'I am the show route'
    }
    res.render('show.ejs', context)
})

module.exports = router;