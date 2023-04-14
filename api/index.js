const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoute = require('./Routes/auth')
const userRoute = require('./Routes/users')
const movieRoute = require('./Routes/movies')
const listRoute = require('./Routes/lists')
const bodyParser = require('body-parser')
const cors = require('cors')

dotenv.config()
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connected Successfully')
  })
  .catch((err) => {
    console.log(err)
  })
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/movies', movieRoute)
app.use('/api/lists', listRoute)
app.listen(process.env.PORT, () => {
  console.log('====================================')
  console.log('Backend server is running successfully....')
  console.log('====================================')
})
