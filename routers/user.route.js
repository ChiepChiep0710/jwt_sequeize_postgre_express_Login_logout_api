const express= require('express')
 
const { models } = require('../sequelize');
const auth = require('../middleware/auth')
const router= express.Router()
router.post('/users',async(req,res)=>{ // dang ky cho user
    try{
        const user= new models.users(req.body)
         await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch (error){
        res.status(400).send(error)
    }
})
router.post('/users/login', async(req, res)=>{
    try{
        const {email, password}= req.body
        const user= await models.users.findByCredentials(email, password)
        if (!user){
            return res.sendstatus(401).send({error: 'login failed! Check authentication credentials'})
        }
        const token = await user.generateAuthToken()
        res.send({user, token })
    } catch (error){
        res.status(400).send(error)
    }
})
router.get('/users/me', auth, async(req, res) => { //lay du lieu user hien tai
    res.send(req.user)
})
router.post('/users/me/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = router