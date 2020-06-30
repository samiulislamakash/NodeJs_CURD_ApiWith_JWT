const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const  customarSchema = mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    customarId:{
        type:String,
        unique: true,
        required: true,
        trim:true,
    },
    customarPassword:{
        type:String,
        requried:true,
        minlenght: 7
    },
    customarAge:{
        type:Number,
        required:true,
        validate(value){
            if(value<=17){
                throw new Error('Age must be equal or more the 18 ')
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required: true
        }
    }]
    
})


customarSchema.virtual('product',{
    ref:'products',
    localField:'_id',
    foreignField:'owner'
})


customarSchema.statics.findCustomar  = async function(customarId , customarPassword){
    const cst = await customar.findOne({customarId})

    if(!cst){
        throw new Error('Unable to found Customar')
    }

    const isMatch = await bcrypt.compare(customarPassword, cst.customarPassword)
    
    if(!isMatch){
        throw new Error('Unable t Found Customar')
    }
    
    return cst
}

// make sure jsonwebtoken is created
customarSchema.methods.tokenGeneration = async function(){
    const customar = this
    const token = jwt.sign({_id:customar._id.toString()},'authwebserver')
    customar.tokens = customar.tokens.concat({token})
    await customar.save()

    return token
    
}

// make sure password is hashed 
customarSchema.pre('save', async function(next){
    const customar = this

    if(customar.isModified('customarPassword')){
        customar.customarPassword = await bcrypt.hash(customar.customarPassword , 8)
    }

    next()
})

const customar = mongoose.model('customars', customarSchema)

module.exports = customar