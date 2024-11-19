const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Voter = sequelize.define('Voter', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	voterID: { type: DataTypes.INTEGER, allownull: false, unique: true },
	fullName: { type: DataTypes.STRING, allowNull: false },
  	constituency: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Voter;
