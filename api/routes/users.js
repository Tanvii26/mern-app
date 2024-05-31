const router = require("express").Router()
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const verify = require("../verifyToken")

// ---Update---
router.put("/:id", verify, async (req, res) => { // before performing OP verify from verifyToken.js if fine move to next OP

    if (req.user.id === req.params.id || req.user.isAdmin) { // if same authenticated user or admin allow update
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body })
            res.status(200).json(updatedUser)
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(400).json("You're not authenticated to update other account")
    }

})

// ---Delete---
router.delete("/:id", verify, async (req, res) => { // before performing OP verify from verifyToken.js if fine move to next OP

    if (req.user.id === req.params.id || req.user.isAdmin) { // if same authenticated user or admin allow delete

        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("User Deleted")
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(400).json("You're not authenticated to delete other account")
    }

})

// ---Get 1---
router.get("/find/:id", async (req, res) => { // before performing OP verify from verifyToken.js if fine move to next OP

    try {
        const user = await User.findById(req.params.id)
        const {password, ...info} = user._doc;
        return res.status(200).json(info)
        
    } catch (err) {
        res.status(500).json(err)
    }


})

// ---Get All Users---
router.get("/",verify, async (req, res) => { // before performing OP verify from verifyToken.js if fine move to next OP
    const query = req.query.new

    if (req.user.isAdmin) { // only for admin all user visible
        try{
            const users = query? await User.find().sort({_id:-1}).limit(5) : await User.find() // latest keliye sort & rev order
            res.status(200).json(users)
        }catch(err){
            res.status(500).json(err)
        }
    }else{
        res.status(400).json("You're not allowed to see all users")
    }

})

// ---Get User Stats---
router.get("/stats", async (req,res)=>{ // month wise stats
    const today = new Date()
    const lastYear = today.setFullYear(today.setFullYear()-1)

    const months = ["January","February","March","April","May","June","July","August", "September","October","November","December"]

    try{
        const data = await User.aggregate([
            {
                $project:{
                    month: {$month :"$createdAt"}
                }
            },{
                $group:{
                    _id: "$month",
                    total:{$sum:1}
                }
            }
        ])

        res.status(200).json(data)
    }catch(err){
        res.status(500).json(err)
    }
})


module.exports = router