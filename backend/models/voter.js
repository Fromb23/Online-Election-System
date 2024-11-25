const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Voter = sequelize.define('Voter', {
	voterId: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
	fullName: { type: DataTypes.STRING, allowNull: false },
	constituency: { type: DataTypes.STRING, allowNull: false },
	voted: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
	timestamps: true,
	tableName: 'Voters',
	id: false,
});

module.exports = Voter;

