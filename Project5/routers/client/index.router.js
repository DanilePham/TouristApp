const router = require('express').Router();
const tourRouter = require('./tour.router');
const homeRouter = require('./home.router');


router.use('/tours', tourRouter);
router.use('/', homeRouter);

module.exports = router;
