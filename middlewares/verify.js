const jwt = require('jsonwebtoken')

const verify = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token) return res.status(400).send('Access denied')

    try{
        const verified = jwt.verify(token, process.env.SECRET)
        req.user = verified.user
        console.log(verified, "verified")
        console.log(req, "req")
        next()
    }

    catch(err){
        res.json(err)
    }
}

module.exports = verify
