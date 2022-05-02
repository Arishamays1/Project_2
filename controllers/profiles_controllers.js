const express = require('express');
const { Profile } = require('../models');
const router = express.Router();
const db = require('../models');

let foundProfile;

//------SHOW PROFILE ROUTE----------
router.get('/:id', async (req, res, next) => {
    try {
        foundProfile = await db.Profile.findById(req.params.id);
        // console.log(foundProfile) DELETE IN FINAL DRAFT
        const foundTweets = await db.Tweet.find({handle: req.params.id});
        // console.log(foundTweets) DELETE IN FINAL DRAFT
        const context = {
            oneProfile: foundProfile,
            message: 'I am the show route',
            profileTweets: foundTweets,
        }
        if (foundProfile) {
            res.render('./profile/show.ejs', context);
        } 
        else {
            next(new Error('no user found'))
        }
    } 
catch(error) {
    // console.log(error); DELETE IN FINAL DRAFT
    req.error = error;
    return next();
    }
})

// route for likes on profile page
router.post('/liked/:id', async (req, res, next) => {
    try {
        const tweet = await db.Tweet.findById(req.params.id);
        if (tweet) {
            tweet.tweetLikes += 1;
            await db.Tweet.findByIdAndUpdate(req.params.id, {tweetLikes: tweet.tweetLikes});
            res.redirect(`/profiles/${foundProfile._id}`);
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