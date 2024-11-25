const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Candidate = sequelize.define('Candidate', {
	candidateId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	candidateName: { type: DataTypes.STRING, allowNull: false },
	PartyId: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Parties', key: 'partyId' } },
	voted: { type: DataTypes.BOOLEAN, defaultValue: false },
	voteCategoryId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'VoteCategories',
			key: 'voteCategoryId'
		},
	},
});

module.exports = Candidate;
