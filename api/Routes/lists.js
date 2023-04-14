const router = require('express').Router()
const List = require('../models/List')
const verify = require('../verifyToken')

// CREATE

router.post('/', verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newList = new List(req.body)

    try {
      const savedList = await newList.save()
      res.status(201).json(savedList)
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(403).json('You are not Authorized!')
  }
})

//DELETE

router.delete('/:id', verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id)
      res.status(201).json('The Movie has been deleted successfully..!')
    } catch (error) {
      res.status(500).json(error)
    }
  } else {
    res.status(403).json('You are not Authorized!')
  }
})

// GET

router.get('/', verify, async (req, res) => {
  const typeQuery = req.body.type
  const genreQuery = req.body.genre
  let list = []

  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $match: { type: typeQuery, genre: genreQuery } },
          { $sample: { size: 10 } },
        ])
      } else {
        list = await List.aggregate([
          { $match: { type: typeQuery } },
          { $sample: { size: 10 } },
        ])
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }])
    }
    res.status(200).json(list)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
