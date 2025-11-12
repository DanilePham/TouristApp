const router = require('express').Router();

const tourControllers = require('../../controllers/client/tour.controller');

router.get('/', tourControllers.getTourList);

module.exports = router;
