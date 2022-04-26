// DB CONNECTION
require('./config/db.connection.js')

// REQUIRING
const Tweet = require('./Models/Tweet')


//---------CREATE METHOD-----------
Tweet.create(
    {
    handle: "jeffreygreen",
    text: "Hello, this is my third tweet"
})