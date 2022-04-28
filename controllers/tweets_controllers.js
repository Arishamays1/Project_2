const express = require('express');
const { Tweet } = require('../models');
const router = express.Router();
const db = require('../models')

//---------ALL TWEETS ROUTE--------
router.get('/', async (req, res, next) => {
    try {
        const tweet = await db.Tweet.find({});
        const context = {tweet: tweet}
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
    const context = {
        oneTweet: foundTweet,
        message: 'I am the show route'
    }
    return res.render('show.ejs', context)
    } catch(error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

router.post('/', async (req, res, next) => {
    try {
        // console.log(`The req.body is ${req.body}`)
        const createdTweet = await db.Tweet.create(req.body);
        console.log(`The created tweet is ${createdTweet}`)
        res.redirect('/tweets');
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

router.post('/liked/:id', async (req, res, next) => {
    try {
        const tweet = await db.Tweet.findById(req.params.id);
        if (tweet) {
            tweet.tweetLikes += 1;
            await db.Tweet.findByIdAndUpdate(req.params.id, {tweetLikes: tweet.tweetLikes});
            res.redirect('/tweets');
        }
        else {
            // Throw 404 Tweet Not Found
        }
    }
    catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

module.exports = router;