const router = require('express').Router();

const settingController = require('../../controllers/admin/setting.controller');

router.get('/list', settingController.listSettings);

router.get('/web-info', settingController.websiteInfo);

router.get('/account-admin/list',settingController.accountAdminList);

router.get('/role/list', settingController.roleList);

router.get('/account-admin/create',settingController.accountAdminListCreate);

router.get('/role/create',settingController.roleCreate)

module.exports = router;