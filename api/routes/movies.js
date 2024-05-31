const router = require("express").Router()
const Movies = require("../models/Movie")
const verify = require("../verifyToken")

// ---Create---
router.post("/", verify, async (req, res) => { // before performing OP verify from verifyToken.js if fine move to next OP

    if (req.user.isAdmin) { // if admin allow movie addition
        const newMovie = new Movies(req.body)

        try {
            const savedMovie = await newMovie.save()
            res.status(200).json(savedMovie)

        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(400).json("You're not authenticated to add movie")
    }

})

// ---Update---
router.put("/:id", verify, async (req, res) => { // before performing OP verify from verifyToken.js if fine move to next OP

    if (req.user.isAdmin) { // if admin allow movie updation

        try {
            const updatedMovie = await Movies.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            res.status(200).json(updatedMovie)

        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(400).json("You're not authenticated to update the movie")
    }

})

// ---Delete---
router.delete("/:id", verify, async (req, res) => { // before performing OP verify from verifyToken.js if fine move to next OP

    if (req.user.isAdmin) { // if admin allow movie deletion

        try {
            await Movies.findByIdAndDelete(req.params.id)
            res.status(200).json("Movie Deleted")

        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(400).json("You're not authenticated to delete movie")
    }

})


// ---Get---
router.get("/find/:id", verify, async (req, res) => { // before performing OP verify user from verifyToken.js 

    try {
        const movie = await Movies.findById(req.params.id)
        res.status(200).json(movie)

    } catch (err) {
        res.status(500).json(err)
    }

})


// ---Get Random for Featured---
router.get("/random", verify, async (req, res) => { // before performing OP verify user from verifyToken.js 
    const type = req.query.type
    let movie
    try {
        if(type === "series"){
            movie = await Movies.aggregate([
                {
                    $match: {isSeries:true}
                },
                {
                    $sample: {size:1}
                }
            ])
        }else{
            movie = await Movies.aggregate([
                {
                    $match: {isSeries:false}
                },
                {
                    $sample: {size:1}
                }
            ])
        }
        res.status(200).json(movie)

    } catch (err) {
        res.status(500).json(err)
    }

})

// ---Get All Movies---
router.get("/", verify, async (req, res) => { // before performing OP verify from verifyToken.js if fine move to next OP

    if (req.user.isAdmin) { // if admin show all movie

        try {
            const movies = await Movies.find()
            res.status(200).json(movies.reverse())

        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(400).json("You're not allowed")
    }

})

module.exports = router