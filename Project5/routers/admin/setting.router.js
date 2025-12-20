const router = require('express').Router();
const clouddinaryHelper = require('../../helpers/cloudinary.helper');
const settingController = require('../../controllers/admin/setting.controller');
const multer = require('multer');

const upload = multer({ storage: clouddinaryHelper.storage });

router.get('/list', settingController.listSettings);

router.get('/website-info', settingController.websiteInfo);

router.get('/account-admin/list', settingController.accountAdminList);

router.get('/role/list', settingController.roleList);

router.get('/account-admin/create', settingController.accountAdminListCreate);

router.get('/role/create', settingController.roleCreate)

router.post('/role/create', settingController.roleCreatePost)


router.patch('/website-info', upload.fields([{
    name: 'logo', maxCount: 1
}, {
    name: 'favicon', maxCount: 1
}]), settingController.updateWebsiteInfo);

router.get('/role/edit/:id', settingController.roleEdit);
router.post('/role/edit/:id', settingController.roleEditPost);

module.exports = router;