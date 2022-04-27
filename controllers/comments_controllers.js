const express = require('express');
const router = express.Router();
const db = require('../models')

//---------------------
router.get("/", async (req, res) => {
const allComments= await db.Comment.find({})
      .populate("Tweet")
      .exec((error, allComments) => {
        if (error) {
          console.log(error);
          req.error = error;
          return next();
        }
        const context = { Comment: allComments };
        return res.render("comments/index", context);
     });
  });

//---------NEW COMMENT-------------
  router.get('/new', async (req,res, next)=>{
    try{ 
        const allTweets= await db.Tweet.find({})
    const context= {tweet: allTweets}
    res.render('comments/new.ejs', context)
    }catch(error){
        console.log(error);
         req.error=error;
         return next();
    }
})
//--------POST Route to send back to tweet ejs--------
router.post('/new',async (req, res)=>{
    try{ 
        const newCommentData= req.body
        const createdComment= await db.Comment.create(newCommentData);
        console.log(createdComment)
        res.redirect(`/tweets/${createdComment.Tweet}`)
    }catch(error){
        console.log(error);
         req.error=error;
         return next();
    }
})


// destroy - delete 
router.delete('/:commentId', async (req,res, next)=>{
    // res.send('hitting review delete: '+req.params.reviewId)
    try{
       const deleteReview = await db.Comment.findByIdAndDelete(req.params.reviewId)
       console.log(deleteComment.id, "<<comment |",deleteComment.tweet,"<<product") 
       res.redirect('/tweets/'+deleteComment.tweet)
    }catch(error){
        console.log(error);
        req.error = error;
        return next();
    }
})

module.exports = router;