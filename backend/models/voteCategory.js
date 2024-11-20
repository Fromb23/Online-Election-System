const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const VoteCategory = sequelize.define('VoteCategory', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false },
});

module.exports = VoteCategory;
