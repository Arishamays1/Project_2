const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    handle: { 
        type: String,
        required: [true, 'you need a Twitter handle']
    },
    image: String,
    }, 
)

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;