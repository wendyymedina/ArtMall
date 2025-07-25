const express = require('express')
const app = express();
const router = require('./routes/galeriaRouter')

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/galeria',router)

module.exports=app;