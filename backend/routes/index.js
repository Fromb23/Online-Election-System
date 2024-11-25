const express = require('express');
const voterRoutes = require('./VoterRoutes');
const voteCategoryRoutes = require('./VoteCategoryRoutes');
const partyRoutes = require('./PartyRoutes');

const router = express.Router();

router.use('/voter', voterRoutes);
router.use('/votecategory', voteCategoryRoutes);
router.use('/parties', partyRoutes);

module.exports = router;
