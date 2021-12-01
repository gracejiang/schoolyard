const verifyJWT = require('../middleware/jwt')

const express = require('express')
const uuid = require('uuid')
const { S3 } = require('../aws/s3')
const Ics = require('../models/ics')

const router = express.Router()

const ICS_FILES_BUCKET = 'schoolyard-ics-files'

router.get('/ics', verifyJWT, async (req, res, next) => {
  const username = req.user?.username
  try {
    res.send((await Ics.find({ username })).map(({s3_ics_id, ics_name}) => ({s3_ics_id, ics_name})))
  } catch (err) {
    next(err)
  }
})

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

router.delete('/ics/:s3IcsId', verifyJWT, async (req, res, next) => {
  const { s3IcsId } = req.params
  const username = req.user?.username
  try {
    // authenticate that this ICS file belongs to this user
    const userIcs = await Ics.findOne({ username, s3_ics_id: s3IcsId })
    if (!userIcs) {
      return next("You don't own such ICS file!")
    }

    await Ics.deleteOne({ username, s3_ics_id: s3IcsId })
    await S3.deleteObject({
      Bucket: ICS_FILES_BUCKET,
      Key: `${username}/${s3IcsId}.ics`
    }).promise()
    return res.json({success: true})
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
  const userIcsFiles = await Ics.find({ username })
  if (userIcsFiles.length >= 10) {
    return next("You cannot own more than 10 ICS files!")
  }
  try {
    await S3.putObject({
      Bucket: ICS_FILES_BUCKET,
      Key: `${username}/${s3IcsId}.ics`,
      Body: req.files.icsFile.data.toString()
    }).promise()
    res.send(await Ics.create({
      username,
      s3_ics_id: s3IcsId,
      ics_name: req.files.icsFile.name,
    }))
  } catch (err) {
    next(err)
  }
})

module.exports = router