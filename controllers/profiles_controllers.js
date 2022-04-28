const express = require('express');
const { Profile } = require('../models');
const router = express.Router();
const db = require('../models');


//------SHOW PROFILE ROUTE----------
router.get('/:id', async (req, res, next) => {
    try {
    const foundProfile = await db.Profile.findById(req.params.id)
    console.log(foundProfile)
    const foundTweets = await db.Tweet.find({handle: req.params.id})
    console.log(foundTweets)
    const context = {
        oneProfile: foundProfile,
        message: 'I am the show route',
        profileTweets: foundTweets,
    }
    if (foundProfile) {
        res.render('./profile/show.ejs', context)
    } else {
        next(new Error('no user found'))
    }
} catch(error) {
    console.log(error);
    req.error = error;
    return next();
    }
})


module.exports = router;