const router = require('express').Router();
const apiRoutes = require('./api');
const dashBoardRoute = require('./dashboard-routes');
const homeRoute = require('./home-routes');

router.use('/', homeRoute);
router.use('/api', apiRoutes);

modeule.exports = router;