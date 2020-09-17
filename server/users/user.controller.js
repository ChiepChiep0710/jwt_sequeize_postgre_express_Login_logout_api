const {model} = require('../Database')
const userService= require('./service')
const userPost = async (req, res) =>{
     const {user: user, status: status, error:error }= await userService.postUser(req.body)
     if(user) res.status(status).send({ user })
     if(error) res.status(status).send(error)
}
const userLogin = async (req, res) =>{
    const {user: user, status: status, error: error, token: token}= await userService.userLogin(req.body)
    if (user) res.status(status).send({user, token})
    if (error) res.status(status).send(error)
}
const getUser= (req, res)=>{
    res.send(req.user)
}
const userLogout = async (req, res)=>{
    const {message: message, status: status, error: error} = await userService.userLogout (req.user)
    if(message) res.status(status).send(message)
    if(error) req.status(status).send(error)
}
module.exports={
    userPost,
    userLogin,
    getUser,
    userLogout
}