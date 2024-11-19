const sequelize = require('../config/db');
const Voter = require('./Voter');
const Candidate = require('./Candidate');
const VoteCategory = require('./VoteCategory');
const County = require('./County');
const Constituency = require('./Constituency');
const Ward = require('./Ward');
const CandidateVoter = require('./CandidateVoter');

Candidate.belongsToMany(Voter, { through: CandidateVoter });
Voter.belongsToMany(Candidate, { through: CandidateVoter });

// Sync database
sequelize.sync({ force: false })
  .then(() => console.log('Database synced successfully'))
  .catch(err => console.log('Error syncing database:', err));

module.exports = { Voter, Candidate, VoteCategory, County, Constituency, Ward, CandidateVoter };
