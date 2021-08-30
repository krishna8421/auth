require('dotenv').config();
const mongoConnect = require('./mongoConnect')
const signUp = require('./router/signUp')
const login = require('./router/login')
const port = process.env.PORT || 8421
const bodyParser = require ('body-parser')
const express = require('express');
const path = require('path');
const app = express()
const jwt = require('jsonwebtoken')

mongoConnect()

app.use(bodyParser.json());
app.use('/', signUp)
app.use('/', login)
app.use(express.static(path.join(__dirname, '/template/public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname+'/template/index.html'));
});


const verifyToken = (req, res, next) => {
  const bearerHeader = req. headers['authorization' ];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    req.token = bearerToken
    next()
  }else{
    res.status(422).json({ status: 'Login to See This URL'})
  }

}
app.get('/private',verifyToken, (req, res) => {
  jwt.verify(req.token,process.env.ACCESS_TOKEN, (err)=>{
    if(err){
      res.status(422)
    }else{
      res.sendFile(path.join(__dirname+'/template/private.html'));
    }
  })
});


// Start the app
app.listen(port, () => {
    console.log(`Api started at Port:${port}`)
});

