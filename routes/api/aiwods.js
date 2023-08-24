const express = require('express');
const router = express.Router();
const aiwodCtrl = require('../../controllers/api/aiwods');

// GET /api/aiwods
router.get('/create',  aiwodCtrl.createWod);

module.exports = router;