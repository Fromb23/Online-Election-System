const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Voter = sequelize.define('Voter', {
	voterId: { type: DataTypes.STRING, allowNull: false },
	fullName: { type: DataTypes.STRING, allowNull: false },
	constituency: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Voter;
