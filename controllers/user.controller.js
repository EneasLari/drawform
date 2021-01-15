var User = require('../models/user.model');
const jwt = require('jsonwebtoken')
var _ = require('lodash')
const config = require('../config/config')

const create = function(req, res, next) {
    console.log(req.body)
    const user = new User(req.body)
    user.save(function(err, result) {
        if (err) {
            console.log(err.message);
            return res.status(400).json({
                // error: errorHandler.getErrorMessage(err)
                error: (err)
            })
        }
        // res.status(200).json({
        //   message: "Successfully signed up!"
        // })
        var token = jwt.sign({
            _id: result._id
        }, config.jwtSecret)
        res.cookie("t", token, {
            expire: new Date() + 9999
        })
        var user = { _id: result._id, name: result.name, email: result.email }
        console.log(user);
        return res.json({
            token,
            user: { _id: result._id, name: result.name, email: result.email }
        })
    })
}

/**
 * Load user and append to req.so the read,update,romove can operate on user
 */
//If the current middleware function does not end the request-response cycle,
// it must call next() to pass control to the next middleware 
//function. Otherwise, the request will be left hanging.
const userByID = function(req, res, next, id) {
    console.log("USERBYUD")
    User.findById(id).exec(function(err, user) {
        if (err || !user)
            return res.status('400').json({
                error: "User not found"
            })
        req.profile = user
        next() //calls the next controller
    })
}

const read = function(req, res) {
    req.profile.hashed_password = undefined
    req.profile.salt = undefined
    return res.json(req.profile)
}

const userslist = function(req, res) {
    console.log("USERS LIST")
    User.find(function(err, users) {
        if (err) {
            return res.status(400).json({
                error: (err)
            })
        }
        res.json(users)
    }).select('name email IsDeleted IsAdmin')
}

const update = function(req, res, next) {
    let user = req.profile
    user = _.extend(user, req.body)
    user.updated = Date.now()
    user.save(function(err) {
        if (err) {
            return res.status(400).json({
                error: (err)
            })
        }
        user.hashed_password = undefined
        user.salt = undefined
        res.json(user)
    })
}

const remove = function(req, res, next) {
    let user = req.profile
    user.remove(function(err, deletedUser) {
        if (err) {
            return res.status(400).json({
                error: (err)
            })
        }
        deletedUser.hashed_password = undefined
        deletedUser.salt = undefined
        res.json(deletedUser)
    })
}
module.exports = {
    userslist,
    create,
    userByID,
    read,
    remove,
    update,
}