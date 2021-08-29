const express = require("express")
const router = express.Router()
const UserSchema = require('../models/UserSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Password Compare Function
const passwordCompare = async (userToCheck,userInDB,res) => {
    if(await bcrypt.compare(userToCheck.password, userInDB.password)){
        const accessToken = jwt.sign(userToCheck, process.env.ACCESS_TOKEN)
        return res.status(200).json({ 
            status: 'Login in Successful',
            accessToken: accessToken
        })
    }else{
        return res.status(422).json({ status: 'Wrong Password'})
    }
}

router.post('/login', async (req, res) => {
    const userToCheck = {
        username: req.body.username,
        password: req.body.password
    }

    await UserSchema.findOne({ username: userToCheck.username })
    .then((userInDB) => {
        if(userInDB){
            try {
                passwordCompare(userToCheck,userInDB,res)
            } catch (error) {
                res.status(422).json({ err: error })
            }
        }
        else{
            return res.status(422).json({ status: 'No User Found' })
        }
    })
    .catch(err => {
        console.log(err)
    })

})

module.exports = router