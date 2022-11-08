const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashBoard = require('./dashboradRoutes')

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashBoard);
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;
