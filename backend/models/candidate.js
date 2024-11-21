const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Candidate = sequelize.define('Candidate', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false },
	party: { type: DataTypes.STRING, allowNull: false },
	voted: { type: DataTypes.BOOLEAN, defaultValue: false },
	voteCategoryId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'VoteCategories',
			key: 'id'
		},
	},
});

module.exports = Candidate;
