const router = require('express').Router();

const tourControllers = require('../../controllers/client/tour.controller');

router.get('/', tourControllers.getTourList);

router.get('/detail', tourControllers.getTourDetails);

module.exports = router;
