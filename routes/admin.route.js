const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

router.get('/', adminController.getAdmins);
router.post('/create', adminController.createAdmin);
router.delete('/delete/:id', adminController.deleteAdminById);

module.exports = router;
