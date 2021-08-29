require('dotenv').config();
const mongoConnect = require('./mongoConnect')
const signUp = require('./router/signUp')
const login = require('./router/login')
const port = process.env.PORT || 8421
const bodyParser = require ('body-parser')
const express = require('express');
const app = express()

mongoConnect()

app.use(bodyParser.json());
app.use('/', signUp)
app.use('/', login)


app.get('/', (req, res) => {
  res.send(`<center><h1>Welcome to the Api</h1></center>`);
});

// Start the app
app.listen(port, () => {
    console.log(`Api started at Port:${port}`)
});
