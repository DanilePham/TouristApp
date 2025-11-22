const router = require('express').Router();

const cartControllers = require('../../controllers/client/cart.controller');

router.get('/', cartControllers.getCartPage);

module.exports = router;