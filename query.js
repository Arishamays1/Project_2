// DB CONNECTION
require('./config/db.connection.js')

// REQUIRING
const Tweet = require('./models/Tweet');
const Comment = require('./models/Comment');
const Profile = require('./models/Profile');

//---------CREATE METHOD-----------
// Tweet.create(
//     {
//     handle: "",
//     text: ""
// })

Comment.create({
    handle: "pigwittajig",
    text: "I concur."
})

Profile.create({
    handle: "kimberlybaldeo"
})