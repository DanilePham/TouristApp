const router = require('express').Router();

const orderController = require('../../controllers/admin/order.controller');

router.get('/list', orderController.listOrders);

router.get('/edit', orderController.editOrder);


module.exports = router;