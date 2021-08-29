const express = require("express")
const router = express.Router()
const UserSchema = require('../models/UserSchema')
const bcrypt = require('bcrypt')


// Save to Database
const saveToDB = async (user,res) => {
    // Hashing Password
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(user.password, salt)
    const newUser = new UserSchema({ username: user.username, password: hashedPassword })
    // Save
    newUser.save()
    .then(() => {
        res.status(200).json({ 
            status: 'Successfully',
            error: null
        })
    })
    .catch(err => {
        res.status(422).json({
             status: 'Error',
             error: err
            })
    })
}

router.post("/signup", async (req, res) => {
    // Get User Data
    const user = {
        username: req.body.username,
        password: req.body.password
    }
    
    // Check for duplicates
    await UserSchema.findOne({ username: user.username })
    .then((userExists) => {
        if(userExists){
            res.status(422).json({ error: 'User Already Exists' })
        }
        else{
            saveToDB(user,res)
        }
    })
    .catch(err => {
        console.log(err)
    })
})


module.exports = router