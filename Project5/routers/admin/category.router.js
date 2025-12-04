const router = require('express').Router();
const categoryController = require('../../controllers/admin/category.controller');
const multer = require('multer');
const upload = multer();

router.get('/list', categoryController.listCategories);

router.get('/create', categoryController.createCategory);

router.post('/create', upload.single('avatar'), categoryController.createPost);



module.exports = router;