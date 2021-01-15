var Design = require('../models/design.model');
var _ = require('lodash')

const designslist = function(req, res) {
    Design.find(function(err, designs) {
        if (err) {
            return res.status(400).json({
                error: (err)
            })
        }
        res.json(designs)
    })
}

const update = function(req, res, next) {
    let user = req.profile
    user = _.extend(user, req.body)
    user.updated = Date.now()
    console.log("Update" + req.body.IsDeleted)
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
    designslist
}