const express = require('express');
const { Comment } = require('../models');
const router = express.Router();
const db = require('../models');

//----------GET ALL COMMENTS-----------
router.get("/", async (req, res) => {
const allComments = await db.Comment.find({})
      .populate("Tweet")
      .exec((error, allComments) => {
        if (error) {
        //   console.log(error); DELETE IN FINAL DRAFT
          req.error = error;
          return next();
        }
        const context = { Comment: allComments };
        return res.render("comments/index", context);
     });
  });

//---------NEW COMMENT-------------
  router.get('/new', async (req,res, next) => {
    try { 
        const allTweets = await db.Tweet.find({});
        const context = {tweet: allTweets};
        res.render('comments/new.ejs', context);
    } catch(error) {
        // console.log(error); DELETE IN FINAL DRAFT
        req.error = error;
        return next();
    }
})

//--------POST Route to send back to tweet ejs--------
router.post('/new', async (req, res) => {
    try { 
        const newCommentData = req.body;
        const createdComment = await db.Comment.create(newCommentData);
        // console.log(createdComment) DELETE IN FINAL DRAFT
        res.redirect(`/tweets/${createdComment.Tweet}`);
    } catch(error) {
        // console.log(error); DELETE IN FINAL DRAFT
        req.error=error;
        return next();
    }
})

// ----------destroy - delete-------------- 
router.delete('/:commentId', async (req,res, next) => {
    // res.send('hitting review delete: '+req.params.reviewId) DELETE IN FINAL DRAFT
    try {
       const deletedComment = await db.Comment.findByIdAndDelete(req.params.commentId);
    // console.log(deletedComment.id, "<<comment |",deletedComment.tweet,"<<tweet") DELETE IN FINAL DRAFT 
       res.redirect(`/tweets/${deletedComment.tweet}`);
    } catch(error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

module.exports = router;