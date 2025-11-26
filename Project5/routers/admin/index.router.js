const router = require('express').Router();
const accountRouter = require('./account.router');
const dashboardRouter = require('./dashboard.router');
const authenMiddleware = require('../../middlewares/admin/authentication.middleware');


router.use('/dashboard',authenMiddleware.verifyToken ,dashboardRouter);
router.use('/account', accountRouter);

module.exports = router;