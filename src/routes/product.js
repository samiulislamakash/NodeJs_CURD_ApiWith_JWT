const express = require('express')
const Product = require('../models/product')
const Auth = require('../middlewere/auth')


const router = new express.Router()

router.post('/product',Auth, async(req , res)=>{
    const product = new Product({
        ...req.body,
        owner:req.customar._id
    })
    try{
        await product.save()
        res.status(200).send(product)
    }catch(e){
        res.status(400).send()
    }
} )

router.get('/product/all',Auth, async(req, res)=>{
    try{
       await req.customar.populate('product').execPopulate()

       res.status(200).send(req.customar.product)
    }catch(e){
        res.status(404).send()
    }
})

router.delete('/product/:id',Auth, async(req, res)=>{
    try{
        const product = await Product.findByIdAndDelete({_id:req.params.id , owner: req.customar._id})
        if(!product){
            return res.status(404).send()
        }

        res.status(200).send(product)
    }catch(e){
        res.status(404).send()
    }
})

router.patch('/product/:id',Auth, async (req , res)=>{
    const updateBody = Object.keys(req.body)
    const allowUpdate = ['name','quantity']
    const isValidOperation = updateBody.every((prod)=> allowUpdate.includes(prod))
    if(!isValidOperation){
        res.status(400).send({error: 'Bad data sending'})
    }
    try{
        const produc = await Product.findOne({_id: req.params.id, owner: req.customar._id})
        
        if(!produc){
            res.status(404).send()
        }
        updateBody.forEach((up)=> produc[up] = req.body[up])

        await produc.save()    
        res.status(200).send(produc)

    }catch(e){
        res.status(400).send()
    }
})
module.exports = router