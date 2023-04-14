const router = require('express').Router()
const Movie = require('../models/Movie')
const verify = require('../verifyToken')

// CREATE MOVIE

router.post('/', verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body)

    try {
      const savedMovie = await newMovie.save()
      res.status(201).json(savedMovie)
    } catch (error) {
      res.status(500).json('There is an error while creating your movie..!')
    }
  } else {
    res.status(403).json('You are not Authorized!')
  }
})

// UPDATE

router.put('/:id', verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updateMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      )
      res.status(201).json(updateMovie)
    } catch (error) {
      res.status(500).json('There is an error while updating your movie..!')
    }
  } else {
    res.status(403).json('You are not Authorized!')
  }
})

// DELETE

router.delete('/:id', verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id)
      res.status(201).json('The Movie has been deleted successfully..!')
    } catch (error) {
      res.status(500).json('There is an error while updating your movie..!')
    }
  } else {
    res.status(403).json('You are not Authorized!')
  }
})

// GET

router.get('/find/:id', verify, async (req, res) => {
  try {
    const getMovie = await Movie.findById(req.params.id)
    res.status(201).json(getMovie)
  } catch (error) {
    res.status(500).json('There is no movie corresponding to this ID..!')
  }
})

//GET RANDOM MOVIE

router.get('/random', verify, async (req, res) => {
  const type = req.query.type
  let movie
  try {
    if (type === 'series') {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ])
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ])
    }
    res.status(200).json(movie)
  } catch (error) {
    res.status(500).json('There is no movie corresponding to this ID..!')
  }
})


module.exports = router