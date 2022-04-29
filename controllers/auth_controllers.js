const express = require('express')
const bcrypt = require('bcryptjs')
require('dotenv').config();
const router = express.Router()
const { Profile } = require('../models');
const { Tweet } = require('../models/Tweet')
const { Comment } = require('../models/Comment');
const { redirect } = require('express/lib/response');


router.get('/login', (req, res) => {
    res.render('auth/login.ejs')
})


// LOGIN ROUTE 
router.post('/login', async function(req, res) {
    try {
        const profileFound = await Profile.findOne({ email: req.body.email })
        console.log(profileFound)
        if(!profileFound) return res.send('The password or the username is invalid try again')
        const match = await bcrypt.compare(req.body.password, profileFound.password)
        if (!match) return res.send("The password or the username is invalid try again")
        req.session.currentProfile = {
            id: profileFound._id,
            handle: profileFound.handle
        }
        return res.redirect('/tweets')
    } catch (err) {
        console.log(err)
        req.err = err;
        res.send(err)
    }
})


// REGISTER ROUTE
router.get('/register', (req, res) => {
    res.render('auth/register.ejs')
})

router.post('/register', async (req, res, next) =>{
    try {
        const profileFound = await Profile.exists({email: req.body.email})
        if (profileFound) {
            return res.redirect('/login')
        }
        const salt = await bcrypt.genSalt(12)
        console.log(salt)
        const hash = await bcrypt.hash(req.body.password, salt)
        console.log(hash)
        req.body.password = hash
        const newProfile = await Profile.create(req.body)
        return res.redirect('/login')
    } catch (error) {
        console.log(err)
        req.err = err;
        res.send(err)
    }
})

router.get("/logout", async (req, res) => {
    try {
        await req.session.destroy();
        console.log(req.session);
        return res.redirect("/login");
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
});


module.exports = router