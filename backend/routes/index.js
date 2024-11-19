const express = require('express');
const voterRoutes = require('VoterRoutes');

const router = express.Router();

router.use('/voter', VoterRoutes);

modules.exports = router;
