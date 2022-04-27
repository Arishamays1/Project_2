const express = require('express');
const { Profile } = require('../models');
const router = express.Router();
const db = require('../models');


//------SHOW PROFILE ROUTE----------
router.get('/:id', async (req, res, next) => {
    try {
    const foundProfile = await db.Profile.findById(req.params.id)
    const context = {
        oneProfile: foundProfile,
        message: 'I am the show route'
    }
    return res.render('profile/show.ejs', context)
    } catch(error) {
        console.log(error);
        req.error = error;
        return next();
    }
})


module.exports = router;