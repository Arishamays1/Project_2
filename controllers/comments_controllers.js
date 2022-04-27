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


module.exports = router;