const { DataTypes } = require('sequelize');
const sequelize = require('.../config/db');

const Vote = sequelize.define('Vote', {
	voteId: { type: DataTypes.STRING, primaryKey: true },
	VoterId: { type: DataTypes.INTEGER, allowNull: false },
    	CandidateId: { type: DataTypes.INTEGER, allowNull: false },
	VoteCategoryId: { type: DataTypes.INTEGER, allowNull: false }
});

model.exports = Vote;
