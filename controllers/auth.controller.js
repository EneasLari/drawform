const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const config = require('../config/config')


var signin = function(req, res) {
    User.findOne({
        "email": req.body.email
    }, function(err, user) {

        if (err || !user)
            return res.status('401').json({
                error: "User not found"
            })

        if (!user.authenticate(req.body.password)) {
            return res.status('401').send({
                error: "Email and password don't match."
            })
        }

        var token = jwt.sign({
            _id: user._id
        }, config.jwtSecret)
        console.log("TOKEN"+token)
        res.cookie("t", token, {
            expire: new Date() + 9999
        })
        var user = { _id: user._id, name: user.name, email: user.email }
        return res.json({
            token,
            user: { _id: user._id, name: user.name, email: user.email }
        })

    })
}

var signout = function(req, res) {
    res.clearCookie("t")
    return res.status('200').json({
        message: "signed out"
    })
}

var requireSignin = expressJwt({
    secret: config.jwtSecret,
    algorithms: ['sha1', 'RS256', 'HS256'],
    userProperty: 'auth'
})

var hasAuthorization = function(req, res, next) {
    console.log(req.auth)
    console.log(req.profile)
    var authorized = req.profile && req.auth && req.profile._id == req.auth._id
    if (!(authorized)) {
        return res.status('403').json({
            error: "User is not authorized"
        })
    }
    next()
}

module.exports = {
    signin,
    signout,
    requireSignin,
    hasAuthorization
}