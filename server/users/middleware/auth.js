const jwt = require('jsonwebtoken')

const { models } = require('../../Database');
const auth = async (req, res, next) =>{
  const token = req.header('Authorization').replace('Bearer ', '')
  try{
  const data = jwt.verify(token, process.env.JWT_KEY)
  if(token==null){ 
    throw new Error()
  }
    const user = await models.users.findOne({ where: { id: data.id, 'token': token } })
    if (!user) {
      throw new Error()
    }
    req.user = user
    req.token = token
    next()
  } catch (error) {
    res.status(401).send({ error: error.message })
  }
}


module.exports = auth