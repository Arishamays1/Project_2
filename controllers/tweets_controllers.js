const express = require('express');
const { Tweet } = require('../models');
const router = express.Router();
const db = require('../models')

//---------ALL TWEETS ROUTE--------
router.get('/', async (req, res, next) => {
    try {
        const tweet = await db.Tweet.find({}).populate("handle");
        const context = {tweet}
        console.log(tweet);
        return res.render('index.ejs', context);
    } catch (error) {
        console.log(error);
        req.error = error;
        return next();
    }
});

// -------NEW TWEET ROUTE-----------
router.get('/newtweet', (req, res) => {
    res.render('new')
})

//------SHOW TWEET ROUTE----------
router.get('/:id', async (req, res, next) => {
    try {
    const foundTweet = await db.Tweet.findById(req.params.id).populate("handle")
    console.log(foundTweet)
    const allComments= await db.Comment.find({tweet:req.params.id})
    const context = {
        oneTweet: foundTweet,
        message: 'I am the show route',
        comments: allComments,
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

router.post('/:id', async (req, res, next) => {
    try {
        // console.log(`The req.body is ${req.body}`)
        const commenting= {
            handle: req.body.handle,
            text: req.body.text,
            //incude img
            tweet: req.params.id
        }
        const createdComment = await db.Comment.create(commenting);
        console.log(`The created tweet is ${createdComment}`)
        res.redirect(`/tweets/${req.params.id}`);
    } catch (error) {
        console.log(error);
        req.error = error; 
        return next();
    }
})

module.exports = router;