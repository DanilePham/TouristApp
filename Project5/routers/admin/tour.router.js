const router = require('express').Router();

const tourRouterController = require('../../controllers/admin/tour.controller');

router.get('/list', tourRouterController.listTours);

router.get('/create', tourRouterController.createTour);

router.get('/trash', tourRouterController.trashTours);


module.exports = router;