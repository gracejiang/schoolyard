const express = require('express')
const uuid = require('uuid')
const { S3 } = require('../aws/s3')
const Ics = require('../models/ics')

const router = express.Router()

const ICS_FILES_BUCKET = 'schoolyard-ics-files'
const USERNAME = 'USERNAME' // TODO: replace with actual username after authentication is implemented

// TODO: add user authentication
router.get('/ics/:s3IcsId', async (req, res, next) => {
  const { s3IcsId } = req.params
  try {
    // authenticate that this ICS file belongs to this user
    const userIcs = await Ics.findOne({ username: USERNAME, s3_ics_id: s3IcsId })
    if (!userIcs) {
      return next("You don't own such ICS file!")
    }

    // return ICS file to the user
    S3.getObject({
      Bucket: ICS_FILES_BUCKET,
      Key: `${USERNAME}/${s3IcsId}.ics`
    }).createReadStream()
      .pipe(res)
  } catch (err) {
    next(err)
  }
})

// TODO: add user authentication
router.post('/upload-ics', async (req, res, next) => {
  if (req?.files?.icsFile?.mimetype !== 'text/calendar') {
    next('No ICS file has been uploaded!')
    return
  }
  const s3IcsId = uuid.v4()
  try {
    await S3.putObject({
      Bucket: ICS_FILES_BUCKET,
      Key: `${USERNAME}/${s3IcsId}.ics`,
      Body: req.files.icsFile.data.toString()
    }).promise()
    res.send(await Ics.create({
      username: USERNAME,
      s3_ics_id: s3IcsId,
    }))
  } catch (err) {
    next(err)
  }
})

module.exports = router