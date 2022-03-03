const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Group = require('../models/group')
const verifyJWT = require('../middleware/jwt')

const router = express.Router()

router.post('/create', async (req, res) => {
    const group = req.body
  
    // TODO: check duplicate groups via unique slug constraint
    const dbGroup = new Group( {
        group_name: group.group_name,
        created_by: "placeholder", // TODO: update with current user
        description: group.description,
        basic_info: group.basic_info,
        contact_email: group.contact_email.toLowerCase(),
        contact_number: group.contact_number,
        join_instructions: group.join_instructions,
        slug: group.slug,
    } )

    console.log(dbGroup)

    dbGroup.save()
    res.json({ message: 'Success' })
})

router.get('/groups', (req, res, next) => {
    try {
        Group.find({}).then(groups => { res.send(groups) })
    } catch (err) {
        next(err)
    }
})

router.get('/group/:id', (req, res, next) => {
    try {
        Group.find({_id: +req.params.id}).then(group => {
            res.send(group)
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router