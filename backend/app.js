const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const path = require('path')
const CalendarRouter = require('./routes/calendar')
const UserRouter = require('./routes/user')
const GroupRouter = require('./routes/group')

// load environmental variables from .env
require('dotenv').config({ path: path.resolve(__dirname, '.env') })

const MONGO_DB_NAME = 'dev'
const MONGO_URI = `mongodb+srv://devUser:PjNlsWA4ei3LXQfS@cluster0.wihdg.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = express()

// CORS
app.use(cors({ origin: true }))

// Middleware
app.use(express.json({ extended: false }))
app.use(fileUpload())

// routers
app.use('/calendar', CalendarRouter)
app.use('/user', UserRouter)
app.use('/group', GroupRouter)

// send 500 error
app.use((err, req, res, next) => {
  res.status(500)
  if (typeof err === 'string') {
    res.send(err)
  } else if (err && err.message) {
    console.error(err.stack)
    res.send(err.message)
  } else {
    res.send(err)
  }
})

const port = process.env.PORT || 8082

const server = app.listen(port, () => console.log(`Server running on port ${port}`))

if (process.env.COMPILE_CHECK) {
  server.close(err => {
    console.log('server closed')
    process.exit(err ? 1 : 0)
  })
}