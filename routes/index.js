var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/nextproject', function(req, res, next) {
    res.render('nextproject', { title: 'Express' });
});

/* GET home page. */
router.get('/storeselection', function(req, res, next) {
    res.render('storeselection', { title: 'Express' });
});


/* GET home page. */
router.get('/toolselection', function(req, res, next) {
    res.render('toolselection', { title: 'Express' });
});

/* GET home page. */
router.get('/designpreview', function(req, res, next) {
    res.render('designpreview', { title: 'Express' });
});

/* GET home page. */
router.get('/brandselection', function(req, res, next) {
    res.render('brandselection', { title: 'Express' });
});

/* GET home page. */
router.get('/myprofile', function(req, res, next) {
    res.render('myprofile', { title: 'Express' });
});


module.exports = router;