require('dotenv').config();
const mongoose = require('mongoose')

MONGO_URI=`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@devcluster.nvdzr.mongodb.net/auth?retryWrites=true&w=majority`

const dbConnect = () =>{
    mongoose.connect(MONGO_URI,{useNewUrlParser: true,useUnifiedTopology: true});
    const db = mongoose.connection
    db.on('error', (error)=> console.error(error))
    db.once( 'open',() => console.log("MongoDB Connected"))

}

module.exports = dbConnect;