const express = require('express');
const router = express.Router();
const aiwodCtrl = require('../../controllers/api/aiwods');

// GET /api/users/check-token
router.get('/create',  aiwodCtrl.createWod);

module.exports = router;