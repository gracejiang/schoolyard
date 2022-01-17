const verifyJWT = require('../middleware/jwt')

const express = require('express')
const uuid = require('uuid')
const { S3 } = require('../aws/s3')
const Ics = require('../models/ics')
const CalCustomEvent = require('../models/calCustomEvent')

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



/** Custom Events**/

router.post('/custom-event', verifyJWT, async (req, res, next) => {
  const username = req.user?.username
  const {
    title,
    isFreeBlock,
    isAllDay,
    startDate,
    endDate,
    isRecurring,
    isEndless,
    startRecurDate,
    endRecurDate,
    recurDays
  } = req.body
  if (typeof title !== "string" || title.length >= 200) {
    return next("The title must be a string and can't be longer than 200 characters!")
  }
  if (!isAllDay && (!(new Date(startDate).getTime()) || !(new Date(endDate).getTime()))) {
    return next("Start and end dates must be valid values!")
  }
  if (!isAllDay && new Date(startDate).getTime() >= new Date(endDate).getTime()) {
    return next("End date must be after the start date!")
  }
  if (isRecurring && (!(new Date(startRecurDate).getTime()) || (!isEndless && !(new Date(endRecurDate).getTime())))) {
    return next("Start and end recurring dates must be valid values!")
  }
  if (isRecurring && !isEndless && new Date(startRecurDate).getTime() >= new Date(endRecurDate).getTime()) {
    return next("End recurring date must be after the start recurring date!")
  }
  if (isRecurring && (!recurDays ||
        recurDays.findIndex(val => [0, 1, 2, 3, 4, 5, 6].indexOf(val) < 0) >= 0 ||
        new Set(recurDays).size !== recurDays.length)) {
    return next("Days on which the event is recurring must be a valid value!")
  }

  try {
    res.send(await CalCustomEvent.create({
      username,
      title: title.length === 0 && "(no title)" || title,
      is_free_block: !!isFreeBlock,
      is_all_day: !!isAllDay,
      start_date: !isAllDay && new Date(startDate) || null,
      end_date: !isAllDay && new Date(endDate) || null,
      is_recurring: !!isRecurring,
      is_endless: !!isEndless,
      recur_start_date: isRecurring && new Date(startRecurDate) || null,
      recur_end_date: isRecurring && new Date(endRecurDate) || null,
      recur_days: isRecurring && recurDays || null,
    }))
  } catch (err) {
    next(err)
  }
})

module.exports = router