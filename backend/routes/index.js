const express = require('express');
const voterRoutes = require('./VoterRoutes');

const router = express.Router();

router.use('/voter', voterRoutes);

module.exports = router;
