const router = require('express').Router();
const categoryController = require('../../controllers/admin/category.controller');
const clouddinaryHelper = require('../../helpers/cloudinary.helper');
const categoryValidate= require('../../validates/admin/category.validate');
const multer = require('multer');

const upload = multer({ storage: clouddinaryHelper.storage });

router.get('/list', categoryController.listCategories);

router.get('/create', categoryController.createCategory);

router.post('/create', upload.single('avatar'), categoryValidate.createPost, categoryController.createPost);



module.exports = router;