const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Vote = sequelize.define('Vote', {
	voteId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	voterId: { type: DataTypes.STRING, allowNull: false },
    CandidateId: { type: DataTypes.INTEGER, allowNull: false },
	VoteCategoryId: { type: DataTypes.INTEGER, allowNull: false },
	status: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
	timestamps: true
});

module.exports = Vote;
