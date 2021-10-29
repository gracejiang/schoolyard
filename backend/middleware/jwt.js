const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = (req.query?.accessToken || req.headers['x-access-token'])?.split(' ')[1]

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(403)
        return res.json({
          isLoggedIn: false,
          message: 'Failed to authenticate',
        })
      }
      req.user = {}
      req.user.id = decoded.id
      req.user.username = decoded.username
      next()
    })
  } else {
    res.status(403)
    res.json({ message: 'Incorrect token given', isLoggedIn: false })
  }
}
