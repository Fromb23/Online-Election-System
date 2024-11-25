const express = require('express');
const voterRoutes = require('./VoterRoutes');
const candidateRoutes = require('./CandidateRoutes');
const voteCategoryRoutes = require('./VoteCategoryRoutes');
const partyRoutes = require('./PartyRoutes');

const router = express.Router();

router.use('/voter', voterRoutes);
router.use('/candidates', candidateRoutes);
router.use('/votecategory', voteCategoryRoutes);
router.use('/parties', partyRoutes);

module.exports = router;
