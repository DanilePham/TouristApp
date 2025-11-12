const router = require('express').Router();

const homeControllers = require('../../controllers/client/home.controller');

router.get('/', homeControllers.getHomePage);

module.exports = router;
