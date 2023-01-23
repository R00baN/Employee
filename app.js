const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')
// const authJwt = require('./helper/jwt')

const dotenv = require('dotenv')
dotenv.config({
    path: './.env'
})
 require('dotenv').config()


const url = process.env.MONGODB

const port = process.env.PORT || 8000
const app = express()

//  
app.use(cors())
mongoose.connect(url, {useNewUrlParser:true,  useUnifiedTopology: true })

const con = mongoose.connection
con.on('open', ()=>{
    console.log('connected..!')
})
//cors 
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

    app.use(allowCrossDomain);
   
 
//JWT auth

// app.use(authJwt())
//Json middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))


// error handler

app.use((err, req, res, next)=>{
    if(err){
        res.json({"success": false, "message":err.message})
    }
})

// Routes
const user = require('./routes/user')
app.use('/users', user)


app.listen(port, () => {
    console.log(`Server connected at ${port}`)
})