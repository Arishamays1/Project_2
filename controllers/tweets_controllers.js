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
router.get('/:id', async (req, res, next) => {
    try {
    const foundTweet = await db.Tweet.findById(req.params.id)
    const allComments= await db.Comment.find({tweet: req.params.id})
    const context = {
        oneTweet: foundTweet,
        message: 'I am the show route',
        comments: allComments
    }
    return res.render('show.ejs', context)
    } catch(error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

module.exports = router;