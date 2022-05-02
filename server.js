const express = require('express');
const app = express();
const methodOverride = require('method-override');
const controllers = require('./controllers');
const PORT = process.env.PORT || 4000

// SESSION
const session = require('express-session');
const MongoStore = require('connect-mongo');

 // DB CONNECTION
require('./config/db.connection')


//---------MIDDLEWARE---------
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}));

// SESSION
app.use(
    session ({
        store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI}),
        secret: 'MYSECRET',
        resave: false,
        saveUnitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 24 * 7 * 2,
        },
    })
)

//--------CONTROLLERS----------
app.use('/tweets', controllers.tweets);
app.use('/comments', controllers.comments);
app.use('/profiles', controllers.profiles);
app.use('/', controllers.auth);


//-----------ROUTING-----------
app.get('/', (req, res) => {
    res.render('home.ejs')
})


app.listen(PORT, () => {
    console.log(`listening to port: ${PORT}`)
})