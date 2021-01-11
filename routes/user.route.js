var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user.controller');
var authCtrl = require('../controllers/auth.controller');

//* GET users listing. */
//  router.get('/', function(req, res, next) {
//    res.send('respond with a resource');
//  });

router.route('/register').get(function(req, res) {
    res.render('register', { title: '' });
})

router.route('/signin').get(function(req, res) {
    res.render('signin', { title: '' });
})

router.route('/api/users')
    .get(userCtrl.userslist)
    .post(userCtrl.create)


router.route('/api/users/:userId')
    .get(authCtrl.requireSignin, userCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove)

router.param('userId', userCtrl.userByID)

module.exports = router;