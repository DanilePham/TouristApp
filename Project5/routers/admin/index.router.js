const router = require('express').Router();
const accountRouter = require('./account.router');
const dashboardRouter = require('./dashboard.router');
const categoryRouter = require('./category.router');
const tourRouter = require('./tour.router');
const orderRouter = require('./order.router');
const userRouter = require('./user.router')
const contactRouter = require('./contact.router')
const settingRouter = require('./setting.router')
const profileRouter = require('./profile.router')
const authenMiddleware = require('../../middlewares/admin/authentication.middleware');


router.use('/dashboard', authenMiddleware.verifyToken, dashboardRouter);
router.use('/account', accountRouter);
router.use('/categories', authenMiddleware.verifyToken,categoryRouter);
router.use('/tours',authenMiddleware.verifyToken, tourRouter);
router.use('/users', authenMiddleware.verifyToken,userRouter);
router.use('/order', authenMiddleware.verifyToken,orderRouter);
router.use('/contact', authenMiddleware.verifyToken,contactRouter)
router.use('/settings', authenMiddleware.verifyToken,settingRouter)
router.use('/profile', authenMiddleware.verifyToken,profileRouter)
router.use(authenMiddleware.verifyToken,(req, res) => {
    res.render('admin/page/error-404', {
        pageTitle: "404 Not Found"
    })
})

module.exports = router;