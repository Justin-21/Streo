const router = require('express').Router()
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

// For Register
          
router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  })
  console.log(newUser)
  try {
    const user = await newUser.save()
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json(error)
  }
})

// for Login

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    })
    !user && res.status(404).send('User Not Found')

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY)
    const originalText = bytes.toString(CryptoJS.enc.Utf8)

    originalText !== req.body.password &&
      res.status(404).send('Your Password is wrong')

    // to hide the password

    const { password, ...info } = user._doc

    // jwt access token
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: '1D' }
    )

    res.status(201).json({ ...info, accessToken })
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
