const router = require('express').Router();

const authMiddleware = require('../../middlewares/auth');

const fetchSites = require('./fetchSites');

router.get('/fetchSites', authMiddleware, fetchSites)


module.exports = router;
