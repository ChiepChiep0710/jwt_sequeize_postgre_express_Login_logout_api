const { DataTypes } = require('sequelize')

const bcrypt = require('bcryptjs');
const validator = require('validator')
const jwt = require('jsonwebtoken');
module.exports = function (sequelize) {
  var users = sequelize.define('users', {
    email: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
      validate: value => {
        if (!validator.isEmail(value)) {
          throw new Error({ error: 'invalid Email' })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      required: true,
      minLength: 7,
    },
    token: {
      type: DataTypes.STRING
    }

  },
    {
      hooks: {
        beforeCreate: (async (user, options) => {
          user.password = await bcrypt.hash(user.password, 8)
        })
      }
    }
  )

  users.prototype.generateAuthToken = async function () {// tao token dua tren id cua user
    const user = this
    const token = jwt.sign({ id: user.id }, process.env.JWT_KEY)
    user.token = token
    await user.save()
    return token
  }
  users.findByCredentials = async function (email, password) { 
    // tim user dung
    try{
    const user = await users.findOne({ where: { email: email } })

    if (!user) {
      throw new Error( 'user is not exist' )
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      throw new Error( 'password is wrong' )
    }
    return {user: user }
    }catch(error){
        return {error: error}
    }
  }
  return users
}