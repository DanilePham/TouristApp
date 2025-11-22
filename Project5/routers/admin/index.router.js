const router = require('express').Router();
const accountRouter = require('./account.router');
const dashboardRouter = require('./dashboard.router');


router.use('/dashboard', dashboardRouter);
router.use('/account', accountRouter);

module.exports = router;