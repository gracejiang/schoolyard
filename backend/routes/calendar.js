const verifyJWT = require('../middleware/jwt')

const express = require('express')
const uuid = require('uuid')
const { S3 } = require('../aws/s3')
const Ics = require('../models/ics')

const router = express.Router()

const ICS_FILES_BUCKET = 'schoolyard-ics-files'

router.get('/ics/:s3IcsId', verifyJWT, async (req, res, next) => {
  const { s3IcsId } = req.params
  const username = req.user?.username
  try {
    // authenticate that this ICS file belongs to this user
    const userIcs = await Ics.findOne({ username, s3_ics_id: s3IcsId })
    if (!userIcs) {
      return next("You don't own such ICS file!")
    }

    // return ICS file to the user
    S3.getObject({
      Bucket: ICS_FILES_BUCKET,
      Key: `${username}/${s3IcsId}.ics`
    }).createReadStream()
      .pipe(res)
  } catch (err) {
    next(err)
  }
})

router.post('/upload-ics', verifyJWT, async (req, res, next) => {
  const username = req.user?.username
  if (req?.files?.icsFile?.mimetype !== 'text/calendar') {
    next('No ICS file has been uploaded!')
    return
  }
  const s3IcsId = uuid.v4()
  try {
    await S3.putObject({
      Bucket: ICS_FILES_BUCKET,
      Key: `${username}/${s3IcsId}.ics`,
      Body: req.files.icsFile.data.toString()
    }).promise()
    res.send(await Ics.create({
      username,
      s3_ics_id: s3IcsId,
    }))
  } catch (err) {
    next(err)
  }
})

module.exports = router