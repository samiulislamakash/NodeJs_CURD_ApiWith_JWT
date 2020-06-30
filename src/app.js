const express = require('express')
require('./db/mongoose')
const customarRoute = require('./routes/customar')
const productRoute = require('./routes/product')

const app = express()
const port = process.env.PORT |3000

app.use(express.json())
app.use(customarRoute)
app.use(productRoute)

app.listen(port,()=>{
    console.log('Server is up '+port)
})
