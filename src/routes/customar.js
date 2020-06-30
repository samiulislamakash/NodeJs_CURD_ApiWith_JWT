const express = require('express')
const router = new express.Router()
const Customar = require('../models/customar')
const Auth = require('../middlewere/auth')

router.post('/customar', async (req , res)=>{
    const customar = new Customar(req.body)
    try{
        await customar.save()
        const token = await customar.tokenGeneration()

        res.status(200).send({customar , token})
    }catch(e){
        res.status(400).send()
    }
})

router.post('/customar/login', async (req , res)=>{
    try{
        const cst = await Customar.findCustomar(req.body.customarId, req.body.customarPassword)

        const token = await cst.tokenGeneration()
        
        res.status(200).send({cst, token})

    }catch(e){
        res.status(404).send()
    }
})


router.post('/customar/logout',Auth, async(req , res) => {
    try{
        console.log(req.customar.tokens)

        req.customar.tokens = req.customar.tokens.filter((token)=>{
            return token.token!=req.token
        })
        await req.customar.save()

        res.sendStatus(200)
    }catch(e){
        res.status(501).send({error:"Unathenticate Customar"})
    }
})


router.get('/customar/me', Auth, async(req,res)=>{
    res.status(201).send(req.customar)
})


module.exports = router
