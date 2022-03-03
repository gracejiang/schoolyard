const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const verifyJWT = require('../middleware/jwt')

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
      first_name: user.first_name,
      last_name: user.last_name,
      school_affiliation: user.school_affiliation,
      grad_year: user.grad_year,
      major: user.major,
      bio: user.bio,
      profile_photo: user.profile_photo,
    })

    console.log(dbUser)

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

// GET for current logged in user
router.get('/profile', verifyJWT, (req, res, next) => {
    try {
        User.findOne({username: req.user?.username}).then(user => {
            res.send(user)
        })
    } catch (err) {
        next(err)
    }
})

// GET for user based on slug
router.get('/profile/:userId', verifyJWT, (req, res, next) => {
    try {
        User.findOne({username: req.params.userId}).then(user => {
            res.send(user)
        })
    } catch (err) {
        next(err)
    }
})

// GET for all users stored in db
router.get('/users', (req, res, next) => {
    try {
        // User.find({}, (err, users) => {
        //     var userMap = {}
        //     users.forEach((user) => {
        //         // Mapping username to user
        //         userMap[user.username] = user;
        //     });
        //     res.send(userMap)
        // })
        User.find({}).then(users => { res.send(users) })
    } catch (err) {
        next(err)
    }
})

module.exports = router