const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    handle: { 
        type: String, 
        required: [true, 'you need a Twitter handle']

    },
    text: {
        type: String,
        required: [true, 'you need text']
    },
    image: {String},
    
    product: {
    
    type: mongoose.Types.ObjectId,
    
    ref: 'Tweet'
  },
},

    {
        timestamps: true
    }
)

    const Comment = mongoose.model('Comment', commentSchema);
    module.exports = Comment;