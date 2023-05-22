// routes/api/index.js
const router = require('express').Router();
const routes = require('./');

router.use('/api', routes);

module.exports = router;
