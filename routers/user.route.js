const express = require('express')

const { models } = require('../sequelize');
const auth = require('../middleware/auth')
const router = express.Router()
router.post('/users', async function (req, res) { // dang ky cho user
  try {

    const user = await models.users.create(req.body)
    //  console.log(req.body)
    res.status(201).send({ user })
  } catch (error) {
    res.status(400).send(error)
  }
})
router.post('/users/login', async function (req, res) {
  try {
    const { email, password } = req.body
    const user = await models.users.findByCredentials(email, password)

    if (!user) {

      return res.sendstatus(401).send({ error: 'login failed! Check authentication credentials' })
    }
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (error) {
    res.status(400).send(error)
  }
})
router.get('/users/me', auth, async function (req, res) { //lay du lieu user hien tai
  res.send(req.user)
})
router.post('/users/me/logout', auth, async function (req, res) {
  try {
    req.user.token = "",
      await req.user.save()
    res.send()
  } catch (error) {
    res.status(500).send(error)
  }
})
module.exports = router