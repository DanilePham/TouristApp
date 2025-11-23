const router = require('express').Router();
const accountController = require('../../controllers/admin/account.controller');
const accountValidate = require('../../validates/admin/account.validate');

router.get('/login', accountController.getAccountPage);

router.post('/login', accountValidate.loginAccountPagePost, accountController.loginAccountPagePost);

router.get('/register', accountController.registerAccountPage);

router.get('/register-initial', accountController.registerAccountPageInitial);

router.post('/register', accountValidate.registerAccountPagePost, accountController.registerAccountPagePost);

router.get('/forgot-password', accountController.forgotPasswordPage);

router.get('/otp-password', accountController.otpPasswordPage);

router.get('/reset-password', accountController.resetPasswordPage);



module.exports = router;