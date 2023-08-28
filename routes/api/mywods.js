// routes/api/wods.js
const express = require('express');
const router = express.Router();
const wodCtrl = require('../../controllers/api/myWods');
const wod = require('../../models/wod');

/* All paths start with '/api/mywods' */

// GET /api/mywods
router.get('/', wodCtrl.index);

// GET /api/mywods/:myWodId
router.get('/:id', wodCtrl.show);

// PUT /api/mywods/:myWodId
router.put('/:id', wodCtrl.update);

// DELETE /api/mywods/:myWodId
router.delete('/:id', wodCtrl.delete);


module.exports = router;