const express = require('express');
const voterRoutes = require('./VoterRoutes');
const voteCategoryRoutes = require('./VoteCategoryRoutes');

const router = express.Router();

router.use('/voter', voterRoutes);
router.use('/votecategory', voteCategoryRoutes);

module.exports = router;
