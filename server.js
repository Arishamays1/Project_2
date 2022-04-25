const express= require('express')
const methodOverride = require('method-override')
const app= express()
PORT= 4000

 // DB CONNECTION
require('./config/db.connection')

//---------MIDDLEWARE---------
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')



//-----------ROUTING-----------
app.get('/', (req, res) => {
    res.send(`This works!`)
})


app.listen(PORT, () => {
    console.log(`listening to ${PORT}`)
})