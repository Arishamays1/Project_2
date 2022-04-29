const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    handle: { 
        type: String,
        required: [true, 'you need a Twitter handle']
    },
    email: {
        type: String,
        required: [true, 'email cannot be blank'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password cannot be blank']
    },
    image: {
        type: String,
        default: "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
    }
},
    {
        timestamps: true
    }
)

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;