const router = require('express').Router();
const profileController = require('../../controllers/admin/profile.controller');
const clouddinaryHelper = require('../../helpers/cloudinary.helper');
const multer = require('multer');
const upload = multer({ storage: clouddinaryHelper.storage });


router.get('/edit', profileController.editProfile);

router.get('/change-password', profileController.changePassword);

router.patch('/edit', upload.single('avatar'), profileController.updateProfile);

router.patch('/change-password', upload.none(), profileController.updateChangePassword);

module.exports = router;