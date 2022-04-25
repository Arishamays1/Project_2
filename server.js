const express= require('express')
const app= express()
PORT= 4000


app.get('/', (req, res)=>{
    res.send(`This works!`)
})


app.listen(PORT, ()=>{console.log(`listening to ${PORT}`)})