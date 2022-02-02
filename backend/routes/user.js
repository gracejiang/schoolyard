const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const router = express.Router()


router.post('/register', async (req, res, next) => {
  const user = req.body

  const takenUsername = await User.findOne({ username: user.username })
  const takenEmail = await User.findOne({ email: user.email })

  if (takenUsername || takenEmail) {
    // TODO: Popup here
    return next('Username or email is not available')
  } else {
    user.password = await bcrypt.hash(req.body.password, 10)

    const dbUser = new User({
      username: user.username.toLowerCase(),
      email: user.email.toLowerCase(),
      password: user.password,
    })

    dbUser.save()
    // TODO: Popup here
    res.json({ message: 'Success' })
  }
})

router.post('/login', (req, res, next) => {

    const user = req.body

    User.findOne({username: user.username})
    .then(dbUser => {
        if (!dbUser) {
            return next('Invalid Username or Password')
        }
        bcrypt.compare(user.password, dbUser.password)
        .then(correctPassword => {
            if (correctPassword) {
                const payload = {
                    id: dbUser._id,
                    username: dbUser.username,
                }
                jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {expiresIn: 86400},
                    (err, token) => {
                        if (err) { 
                            // TODO: Popup here
                            return next(err)
                        }
                        // TODO: Popup here
                        return res.json({
                            message: 'Success',
                            token: 'Bearer ' + token
                        })
                    }
                )
            } else {
                // TODO: Popup here
                return next('Invalid Username or Password')
            }
        })
    })
})

router.get('/profile/:username', (req, res, next) => {
    const username = req.params
    User.findOne({ username: username }).then(dbUser => {
        if (!dbUser) {
            return next('User not found')
        }
        res.send(dbUser)
    })
})

module.exports = router