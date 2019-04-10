let express = require('express');

// mysql constollers
let userController = require('../controllers/user');

let router = express.Router();

// user profile page
router.post('/', userController.createUser);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
// router.delete('/:id', userController.ensureAuthenticated, userController.deleteUser);

module.exports = router;