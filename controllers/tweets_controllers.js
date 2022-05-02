const express = require('express');
const { Tweet } = require('../models');
const router = express.Router();
const db = require('../models');
const { populate } = require('../models/Tweet');

//---------ALL TWEETS ROUTE--------
router.get('/', async (req, res, next) => {
    try {
        const tweet = await db.Tweet.find({}).populate("handle");
        const context = {tweet}
        // console.log(tweet); DELETE IN FINAL DRAFT
        return res.render('index.ejs', context);
    } catch (error) {
        // console.log(error); DELETE IN FINAL DRAFT
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
    const foundTweet = await db.Tweet.findById(req.params.id).populate("handle");
    // console.log(foundTweet)DELETE IN FINAL DRAFT
    const allComments= await db.Comment.find({tweet:req.params.id}).populate("handle");
    const context = {
        oneTweet: foundTweet,
        message: 'I am the show route',
        comments: allComments,
    }
    return res.render('show.ejs', context);
    } catch(error) {
        // console.log(error); DELETE IN FINAL DRAFT
        req.error = error;
        return next();
    }
})

// -------EDIT TWEET ROUTE-------
router.get('/:id/edit', async (req,res, next)=>{
    try {
        const updatedTweet = await db.Tweet.findById(req.params.id).populate("handle");
        // console.log(updatedTweet); DELETE IN FINAL DRAFT
        const context = {
            tweet: updatedTweet
        }
        return res.render('edit.ejs', context)
    } catch (error) {
        // console.log(error); DELETE IN FINAL DRAFT
        req.error = error;
        return next();
    }
})


// -------POST TWEET ROUTE-------
router.post('/', async (req, res, next) => {
    try {
        // console.log(`The req.body is ${req.body}`)
        const createdTweet = await db.Tweet.create(req.body);
        console.log(`Here is the new ${createdTweet}`)
        // console.log(`The created tweet is ${createdTweet}`) DELETE IN FINAL DRAFT
        res.redirect('/tweets');
    } catch (error) {
        console.log(error);
        req.error = error; 
        return next();
    }
})

// ------POST COMMENT ROUTE ON TWEET PAGE------
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
        // console.log(`The created tweet is ${createdComment}`) DELETE IN FINAL DRAFT
        res.redirect(`/tweets/${req.params.id}`);
    } catch (error) {
        // console.log(error); DELETE IN FINAL DRAFT
        req.error = error; 
        return next();
    }
})

// -------DELETE TWEET ROUTE-------
router.delete('/:id', async (req, res, next) => {
    try {
        const deletedTweet = await db.Tweet.findByIdAndDelete(req.params.id);
        if (deletedTweet) {
            // console.log(deletedTweet._id, 'deleted'); DELETE IN FINAL DRAFT
            res.redirect(`/tweets/`);
        } else {
            res.redirect(`/tweets/${req.params.id}`);
        }
    } catch (error) {
        next(new Error(error.message))
    }
})

// ------ UPDATE/PUT ROUTE-------
router.put('/:id', async (req, res, next)=>{
    try {
        const updatedTweet = await db.Tweet.findByIdAndUpdate(req.params.id, req.body);
        // console.log(updatedTweet); DELETE IN FINAL DRAFT
        return res.redirect(`/tweets/${req.params.id}`);
    } catch (error) {
        // console.log(error); DELETE IN FINAL DRAFT
        req.error = error;
        return next();
    }
})

// route for likes on index page
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
        // console.log(error); DELETE IN FINAL DRAFT
        req.error = error;
        return next();
    }
})


module.exports = router;