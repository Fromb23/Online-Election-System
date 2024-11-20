const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CandidateVoteCategory = sequelize.define('CandidateVoteCategory', {
	candidateId: {
		type: DataTypes.INTEGER,
		references: {
			model: 'Candidates',
			key: 'id',
		},
	},
	voteCategoryId: {
		type: DataTypes.INTEGER,
		references: {
			model: 'VoteCategories',
			key: 'id',
		},
	},
});

module.exports = CandidateVoteCategory;
