// routes/api/aiwods.js
const express = require('express');
const router = express.Router();
const aiwodCtrl = require('../../controllers/api/aiwods');

// GET /api/aiwods/create
router.get('/create',  aiwodCtrl.createWod);

// POST /api/aiwods/save
router.post('/save', aiwodCtrl.saveWod);

module.exports = router;