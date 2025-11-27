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
router.use('/categories', categoryRouter);
router.use('/tours', tourRouter);
router.use('/users', userRouter);
router.use('/order', orderRouter);
router.use('/contact', contactRouter)
router.use('/settings', settingRouter)
router.use('/profile', profileRouter)
router.use((req, res) => {
    res.render('admin/page/error-404', {
        pageTitle: "404 Not Found"
    })
})

module.exports = router;