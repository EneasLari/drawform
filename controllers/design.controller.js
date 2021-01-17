var Design = require('../models/design.model');
var _ = require('lodash')

//https://mongoosejs.com/docs/populate.html
const designslist = function(req, res) {
    Design.find(function(err, designs) {
        if (err) {
            return res.status(400).json({
                error: (err)
            })
        }
        res.json(designs)
    }).populate('UserId', 'name')
}

const create = (req, res, next) => {
    const design = new Design(req.body)
    if (isNaN(design.Price)) {
        return res.status(400).json({
            error: "Price must be number"
        })
    }
    design.Image = req.fileid //the received req.fileid comes from uploadimage
        //console.log(design);
    design.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: "Error saving design"
                    // error: errorHandler.getErrorMessage(err)
            })
        }
        return res.status(200).json({
            design: result
        })
    })
}

const designByID = function(req, res, next, id) {
        Design.findById(id).exec(function(err, design) {
            if (err || !design)
                return res.status('400').json({
                    error: "design not found"
                })
            req.design = design
            next() //calls the next controller
        })
    }
    //check if the user of design is the logged in user giving the handle of request to hasauthorization (if next is hasAuthorization)
const designUser = function(req, res, next) {
    req.profile = {
        _id: req.design.UserId
    }
    console.log("USER OF DESIGN " + req.profile._id)
    next()
}

const myDesigns = function(req, res) {
    console.log(req.auth._id)
    Design.find({ UserId: req.auth._id }).exec(function(err, designs) {
        if (err) {
            return res.status('400').json({
                error: "designs not found"
            })
        }
        res.json(designs)
    })
}

const update = function(req, res, next) {
    let design = req.design
    design = _.extend(design, req.body)
    design.save(function(err) {
        if (err) {
            return res.status(400).json({
                error: (err)
            })
        }
        res.json(design)
    })
}

const remove = function(req, res, next) {
    let design = req.design
    design.remove(function(err, deleteddesign) {
        if (err) {
            return res.status(400).json({
                error: (err)
            })
        }
        res.json(deleteddesign)
    })
}

const read = function(req, res) {
    return res.json(req.design)
}

module.exports = {
    create,
    designslist,
    update,
    remove,
    designByID,
    read,
    designUser,
    myDesigns
}