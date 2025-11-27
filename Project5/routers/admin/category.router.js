const router = require('express').Router();

const categoryController = require('../../controllers/admin/category.controller');

router.get('/list', categoryController.listCategories);

router.get('/create', categoryController.createCategory);


module.exports = router;