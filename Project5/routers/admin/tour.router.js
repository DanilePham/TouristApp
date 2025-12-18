const router = require('express').Router();
const tourRouterController = require('../../controllers/admin/tour.controller');
const clouddinaryHelper = require('../../helpers/cloudinary.helper');
const tourValidate= require('../../validates/admin/tour.validate');
const multer = require('multer');
const upload = multer({ storage: clouddinaryHelper.storage });

router.get('/list', tourRouterController.listTours);

router.get('/create', tourRouterController.createTour);

router.get('/trash', tourRouterController.trashTours);

router.post('/create',upload.single('avatar') ,tourValidate.createPost ,tourRouterController.createTourss);

router.patch('/change-multi-status', tourValidate.changeMultiPatch, tourRouterController.changeMultiPatch);

router.get('/edit/:id', tourRouterController.editTour);

router.patch('/edit/:id', upload.single('avatar'), tourValidate.createPost, tourRouterController.editPatch);

module.exports = router;