// DB CONNECTION
require('./config/db.connection.js')

// REQUIRING
const Tweet = require('./models/Tweet')
const Comment = require('./models/Comment')

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