// DB CONNECTION
require('./config/db.connection.js')

const { Profile } = require('./models/index.js')
// REQUIRING
const Tweet = require('./models/Tweet')
const Comment = require('./models/Comment')

//---------CREATE METHOD-----------
Tweet.create(
    {
        handle: "jeffreygreen",
        text: "Hello, this is my third tweet"
    }
)

Profile.create(
    {
        handle: "jeffreygreen"
    }
)
