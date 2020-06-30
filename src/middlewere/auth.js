const jwt = require('jsonwebtoken')
const Customar = require('../models/customar')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'authwebserver')
        const customar = await Customar.findOne({ _id: decoded._id, 'tokens.token': token })
        if(!customar){
            throw new Error()
        }
        req.customar = customar
        req.token = token
        next()
    }catch(e){
        res.status(401).send({error:'Please authnticate'})
    }
}


module.exports = auth