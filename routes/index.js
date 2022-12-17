const router = require('express').Router();
const apiRoutes = require('./api')

router.use('/api', apiRoutes)

router.use((req, res) => res.send('Wrong route!'))

module.exports = router;

// Reference: 18 > 28-Stu_Mini-Project