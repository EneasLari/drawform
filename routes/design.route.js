var express = require('express');
var router = express.Router();
var designCtrl = require('../controllers/design.controller');
var authCtrl = require('../controllers/auth.controller');


router.route('/api/designs')
    .get(designCtrl.designslist)
    .post(authCtrl.requireSignin, designCtrl.create)

router.route('/api/mydesigns')
    .get(authCtrl.requireSignin, designCtrl.myDesigns)

router.route('/api/designs/:designid')
    .get(authCtrl.requireSignin, designCtrl.read)
    .put(authCtrl.requireSignin, designCtrl.designUser, authCtrl.hasAuthorization, designCtrl.update)
    .delete(authCtrl.requireSignin, designCtrl.designUser, authCtrl.hasAuthorization, designCtrl.remove)

router.param('designid', designCtrl.designByID)

module.exports = router;