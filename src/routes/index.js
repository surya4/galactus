let express = require('express');

// mysql constollers
let indexController = require('../controllers/index');

let router = express.Router();

// index home page
router.get('/', indexController.get);

module.exports = router;