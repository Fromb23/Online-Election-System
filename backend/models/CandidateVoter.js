const CandidateVoter = sequelize.define('CandidateVoter', {});

Candidate.belongsToMany(Voter, { through: CandidateVoter });
Voter.belongsToMany(Candidate, { through: CandidateVoter });
