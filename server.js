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


//-----------ROUTING-----------
app.get('/', (req, res) => {
    res.send(`Welcome to Elon Musk's Twitter!`)
})

//--------ALL TWEETS ROUTE---------
app.get('/tweets', (req, res) => {
    res.render('index')
})

//-------NEW TWEET ROUTE-----------
app.get('/tweets/new', (req, res) => {
    res.render('new')
})


app.listen(PORT, () => {
    console.log(`listening to ${PORT}`)
})