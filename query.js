// DB CONNECTION
require('./config/db.connection.js')

// REQUIRING
const Tweet = require('./models/Tweet');
const Comment = require('./models/Comment');
const Profile = require('./models/Profile');

//---------CREATE METHOD-----------
Tweet.create(
    {
    handle: "626878baf561c1f5791d08a4",
    text: "Thanks Joshua!"
})

Comment.create({
    handle: "pigwittajig",
    text: "I concur."
})

Profile.create({
    handle: "kimberlybaldeo"
})