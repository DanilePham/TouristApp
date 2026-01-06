const router = require('express').Router();
const tourRouter = require('./tour.router');
const homeRouter = require('./home.router');
const cartRouter = require('./cart.router');
const settingInfo=require('../../middlewares/client/setting.middleware');
const categoryInfo=require('../../middlewares/client/category.middleware');
const contactRouter = require('./contact.router');

router.use(settingInfo.websiteInfo);
router.use(categoryInfo.list);

router.use('/tours', tourRouter);
router.use('/', homeRouter);
router.use('/cart', cartRouter);
router.use('/contact', contactRouter);

module.exports = router;
