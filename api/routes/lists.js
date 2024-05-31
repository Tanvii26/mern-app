const router = require("express").Router()
const List = require("../models/List")
const verify = require("../verifyToken")

// ---Create---
router.post("/", verify, async (req, res) => { // verify from verifyToken.js if fine move to next OP

    if (req.user.isAdmin) { // if admin allow movie addition
        const newList = new List(req.body)

        try {
            const savedList = await newList.save()
            res.status(200).json(savedList)

        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(400).json("You're not allowed")
    }

})

// ---Delete---
router.delete("/:id", verify, async (req, res) => { // verify from verifyToken.js if fine move to next OP

    if (req.user.isAdmin) { // if admin allow movie addition
        try {
            await List.findByIdAndDelete(req.params.id)
            res.status(200).json("List Deleted!")

        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(400).json("You're not allowed")
    }

})

// ---Get---
router.get("/", verify, async (req, res) => { // verify from verifyToken.js if fine move to next OP

    const type = req.query.type
    const genre = req.query.genre
    let list=[]
        try {
            if(type){
                if(genre){
                    list = await List.aggregate([
                        {
                            $sample: {size:10}
                        },
                        {
                            $match:{type:type, genre:genre}
                        }
                    ])
                }else{
                    list = await List.aggregate([
                        {
                            $sample: {size:10}
                        },
                        {
                            $match:{type:type}
                        }
                    ])
                }
            }else{
                list = await List.aggregate([{
                    $sample:{size:10}
                }])
            }

            res.status(200).json(list)
        } catch (err) {
            res.status(500).json(err)
        }
   
})


module.exports = router