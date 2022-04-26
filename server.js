const express = require('express')
const app = express();
const methodOverride = require('method-override')
const PORT = 4000;


 // DB CONNECTION
require('./config/db.connection')


//---------MIDDLEWARE---------
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: false}))

//----------MODELS-------------
const tweets = require('./Models/Tweet')
const comments = require('./Models/Comment')


//-----------ROUTING-----------
app.get('/', (req, res) => {
    res.send(`Welcome to Elon Musk's Twitter!`)
})

//--------ALL TWEETS ROUTE---------
app.get('/tweets', (req, res) => {
    res.render('index')
})

//-------NEW TWEET ROUTE-----------
app.get('/tweets/newtweet', (req, res) => {
    res.render('new')
})

//------SHOW TWEET ROUTE----------
app.get('/tweets/:id', (req, res) => {
    let tweetId = req.params.id
    console.log('hitting show route')
    const context = {
        oneTweet: tweets[tweetId],
        message: 'I am the show route'
    }
    res.render('show.ejs', context)
})


app.listen(PORT, () => {
    console.log(`listening to ${PORT}`)
})