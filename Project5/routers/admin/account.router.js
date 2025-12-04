const router = require('express').Router();
const accountController = require('../../controllers/admin/account.controller');
const accountValidate = require('../../validates/admin/account.validate');
const authenMiddleware = require('../../middlewares/admin/authentication.middleware');

router.get('/login', accountController.getAccountPage);

router.post('/login', accountValidate.loginAccountPagePost, accountController.loginAccountPagePost);

router.get('/register', accountController.registerAccountPage);

router.get('/register-initial', accountController.registerAccountPageInitial);

router.post('/register', accountValidate.registerAccountPagePost, accountController.registerAccountPagePost);

router.post('/forgot-password', accountValidate.forgotPasswordPagePost, accountController.forgotPasswordPagePost);

router.get('/forgot-password', accountController.forgotPasswordPage);

router.get('/otp-password', accountController.otpPasswordPage);

router.post('/otp-password', accountValidate.otpPasswordPagePost, accountController.otpPasswordPagePost);

router.get('/reset-password', accountController.resetPasswordPage);

router.post('/reset-password',
     authenMiddleware.verifyToken,
     accountValidate.resetPasswordPagePost, 
     accountController.resetPasswordPagePost);

router.get('/logout', accountController.logoutAccountPage);



module.exports = router;