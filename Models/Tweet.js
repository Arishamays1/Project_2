const mongoose = require('mongoose')

const tweetSchema = new mongoose.Schema({
    handle: { 
        type: String, 
        required: [true, 'you need a Twitter handle']
    },
    text: {
        type: String,
        required: [true, 'you need text']
    },
    image: String, 
    tweetLikes: {
        type: Number,
        default: 0
    },
    // timestamps: true
})

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;


