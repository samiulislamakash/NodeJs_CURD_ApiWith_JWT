const mongoose = require('mongoose')

const Product = mongoose.model('products',{
    name:{
        type:String,
        trim: true,
        requried: true,
    },
    price:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'customars'
    }
})

module.exports = Product
