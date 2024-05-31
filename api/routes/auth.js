const router = require("express").Router()
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

// ---Register---
router.post("/register", async (req, res) => { // async for readability
    // req me aai details se kaam ki info nikali
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(), // encrypt password before storing in db
    });

    try {
        const user = await newUser.save(); // await waits for promise if fullfil->try else->catch
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err)
    }
})
 
// ---Login---
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if(!user){
            return res.status(401).json("Incorrect email or username!")
        } 
        
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        
        if(originalText !== req.body.password){
            return  res.status(401).json("Wrong Password!")
        } 
        
        const accessToken = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.SECRET_KEY, {expiresIn:"15d"})

        const {password, ...info} = user._doc;
        return res.status(200).json({...info, accessToken})
        // return res.status(200).json(user)
        

    } catch (err) {
       return res.status(500).json(err)
        
    }
})


module.exports = router