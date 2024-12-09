const express = require('express');
const voterRoutes = require('./VoterRoutes');
const candidateRoutes = require('./CandidateRoutes');
const voteCategoryRoutes = require('./VoteCategoryRoutes');
const partyRoutes = require('./PartyRoutes');
const adminRoutes = require('./AdminRoutes');

const router = express.Router();

router.use('/voter', voterRoutes);
router.use('/candidates', candidateRoutes);
router.use('/votecategory', voteCategoryRoutes);
router.use('/parties', partyRoutes);
router.use('/admins', adminRoutes);

module.exports = router;
