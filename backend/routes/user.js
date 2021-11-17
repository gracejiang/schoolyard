const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const router = express.Router()


router.post('/register', async (req, res) => {
  const user = req.body

  const takenUsername = await User.findOne({ username: user.username })
  const takenEmail = await User.findOne({ email: user.email })

  if (takenUsername || takenEmail) {
    // TODO: Popup here
    res.json({ message: 'Username or email is not available' })
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

router.post('/login', (req, res) => {

    const user = req.body

    User.findOne({username: user.username})
    .then(dbUser => {
        if (!dbUser) {
            // TODO: Popup here
            return res.json({
                error: 'Invalid Username or Password'
            })
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
                            return res.json({message: err}) 
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
                return res.json({
                    message: 'Invalid Username or Password'
                })
            }
        })
    })
})

module.exports = router