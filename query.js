// DB CONNECTION
require('./config/db.connection.js')

const { Profile } = require('./models/index.js')
// REQUIRING
const Tweet = require('./models/Tweet');
const Comment = require('./models/Comment');
const Profile = require('./models/Profile');

//---------CREATE METHOD-----------
Tweet.create(
    {
    handle: "6269653b058089a7720a5485",
    text: "It was handle, not profile"
})

Comment.create({
    handle: "pigwittajig",
    text: "I concur."
})

Profile.create({
    handle: "kimberlybaldeo"
})
