const router = require('express').Router();

const userController = require('../../controllers/admin/user.controller');

router.get('/list', userController.listUsers);

module.exports = router;