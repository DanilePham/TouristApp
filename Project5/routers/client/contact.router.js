const router = require('express').Router();
const contactControllers = require('../../controllers/client/contact.controller.js');

router.post('/create', contactControllers.createPostEmail);

module.exports = router;    