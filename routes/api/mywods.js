// routes/api/wods.js
const express = require('express');
const router = express.Router();
const wodCtrl = require('../../controllers/api/myWods');

/* All paths start with '/api/mywods' */

// GET /api/mywods
router.get('/', wodCtrl.index);



module.exports = router;