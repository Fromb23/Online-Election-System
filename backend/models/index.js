'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

// Initialize Sequelize instance
const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	config
);

// Import models manually
const Candidate = require('./candidate');
const VoteCategory = require('./voteCategory');
const Voter = require('./voter');
const Vote = require('./vote');
const Party = require('./party');
const Admin = require('./admin');
const County = require('./county');
const Constituency = require('./constituency');
const PollingStation = require('./pollingStation');

// Defined associations
// Associations between Voter and Vote
Voter.hasMany(Vote, { foreignKey: 'voterId', as: 'votes' });
Vote.belongsTo(Voter, { foreignKey: 'voterId', as: 'voter' });

// Associations between Candidate and Vote
Candidate.hasMany(Vote, { foreignKey: 'CandidateId', as: 'votes' });
Vote.belongsTo(Candidate, { foreignKey: 'CandidateId', as: 'candidate' });

// Associations between VoteCategory and Vote
VoteCategory.hasMany(Vote, { foreignKey: 'VoteCategoryId', as: 'votes' });
Vote.belongsTo(VoteCategory, { foreignKey: 'VoteCategoryId', as: 'voteCategory' });


Candidate.belongsTo(Party, { foreignKey: 'PartyId', as: 'party' });
Party.hasMany(Candidate, { foreignKey: 'PartyId', as: 'candidates' });
Candidate.belongsTo(VoteCategory, { foreignKey: 'voteCategoryId', as: 'voteCategory' });
VoteCategory.hasMany(Candidate, { foreignKey: 'voteCategoryId', as: 'candidates' });

County.hasMany(Constituency, {
	foreignKey: 'countyId',
	sourceKey: 'countyId',
  });
  
Constituency.belongsTo(County, {
	foreignKey: 'countyId',
	targetKey: 'countyId',
  });
  
  Constituency.hasMany(PollingStation, {
	foreignKey: 'constituencyId',
	sourceKey: 'constituencyId',
  });
  

PollingStation.belongsTo(Constituency, {
	foreignKey: 'constituencyId',
	targetKey: 'constituencyId',
  });

// Add models to the `db` object
db.Candidate = Candidate;
db.VoteCategory = VoteCategory;
db.Voter = Voter;
db.Vote = Vote;
db.Party = Party;
db.Admin = Admin;
db.County = County;
db.Constituency = Constituency;
db.PollingStation = PollingStation;

// Automatically import and initialize other models in the folder
fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf('.') !== 0 &&
			file !== basename &&
			file.slice(-3) === '.js' &&
			file.indexOf('.test.js') === -1
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file));
		db[model.name] = model;
	});

// Call associate methods on models if they exist
Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

// Add Sequelize and sequelize to the `db` object for exporting
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
