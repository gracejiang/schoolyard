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

router.get('/profile', (req, res, next) => {
    // const { token } = req.params
    res.send(req.user)

    // const username = req.user?.username;
    // try {
    //     res.send((User.findOne({ username: username })))
    // } catch (err) {
    //     next(err)
    // }
})

/**
 * requires followeruser in the axios post
 */
router.post("/followUser", (req, res) => {
    const currUser = req.user?.username;
    const followerUser = req.body.followUser;

    User.findOne({ username: currUser }).then( user => {
        if (!user) {
            // User doesn't exist
            return res.status(400).json( { username: "User not found" });
        } else {
            user.followers.push({ username: followerUser })
            user.save().then( user => { 
                console.log("Followed user successfully")
                res.json(user)
            }).catch(err => console.log(err));
        }
    })
})

router.post("/unfollowUser", (req, res) => {
    const currUser = req.user?.username;
    const followerUser = req.body.followUser;

    User.findOne({ username: currUser }).then( user => {
        if (!user) {
            // User doesn't exist
            return res.status(400).json( { username: "User not found" });
        } else {
            user.followers.pull({ username: followerUser })
            user.save().then( user => { 
                console.log("Unfollowed user successfully")
                res.json(user)
            }).catch(err => console.log(err));
        }
    })
})

module.exports = router