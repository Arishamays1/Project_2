// DB CONNECTION
require('./config/db.connection.js')

// REQUIRING
const Tweet = require('./models/Tweet')
const Comment = require('./models/Comment')

//---------CREATE METHOD-----------
Tweet.create(
    {
    handle: "jeffreygreen",
    text: "Hello, this is my third tweet"
})

Comment.create({
    handle: "pigwittajig",
    text: "I concur."
})