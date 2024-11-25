const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const VoteCategory = sequelize.define('VoteCategory', {
	voteCategoryId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false , unique: true},
});

module.exports = VoteCategory;
