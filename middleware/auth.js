const jwt=require('jsonwebtoken')
 
const { models } = require('../sequelize');
const auth= async (req, res, next)=>{
    const token= req.header('Authorization').replace('Bearer ', '')
    const data = jwt.verify(token, process.env.JWT_KEY)
    try {
        const user = await models.users.findOne({where: {id: data.id, 'token': token }}).then(function(user){})
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }
}
module.exports = auth