const mongoose = require('mongoose')

const tweetSchema = new mongoose.Schema({
    handle: { 
        type: mongoose.Types.ObjectId, 
        ref: 'Profile',
        required: [true, 'you need a Twitter handle']
    },
    tweetLikes: {
        type: Number,
        default: 0
    },
    text: {
        type: String,
        required: [true, 'you need text']
    },
    image: String,
    }, 
    {
        timestamps: true
    }
)

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;


