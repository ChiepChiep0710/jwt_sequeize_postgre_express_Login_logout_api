const { DataTypes } =require('sequelize')

const bcrypt=require('bcryptjs');
const validator=require('validator')
const jwt=require('jsonwebtoken');
module.exports = (sequelize) =>{
 var users= sequelize.define('users',{
        email:{
            type: DataTypes.STRING,
            required: true,
            unique: true,
            validate: value => {
                if(!validator.isEmail(value)){
                    throw new Error({error: 'invalid Email'})
                }
            }
        },
        password:{
            type:DataTypes.STRING,
            required: true,
            minLength: 7,
        },
        tokens: [{
            token:{
                type:DataTypes.STRING,
                required: true
            }
        }]
})
users.beforeSave(async (user,options)=>{
    if(user.isModified('password')){
        user.password= await bcrypt.hash(user.password,8)
    }
})
users.generateAuthToken = async function(){
    const user=this
    const token= jwt.sign({id: user.id},process.env.JWT_KEY)
    user.tokens= user.tokens.concat({token})
    await user.save()
    return token
}
users.findByCredentials = async(email, password)=>{
    const user= await users.findOne({where: {email: email}}).then(function(user){})
    if(!user){
        throw new Error({error: 'invalid login credential'})
    }
    const isPasswordMatch= await bcrypt.compare(password, user.password)
    if (!isPasswordMatch){
        throw new Error({error: 'invalid login credential'})
    }
    return user
 }
}