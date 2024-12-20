const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const Voter = sequelize.define('Voter', {
	voterId: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
	fullName: { type: DataTypes.STRING, allowNull: false },
	county: { type: DataTypes.STRING, allowNull: false },
	constituency: { type: DataTypes.STRING, allowNull: false },
	pollingStation: { type: DataTypes.STRING, allowNull: false },
	voted: { type: DataTypes.BOOLEAN, defaultValue: false },
	password: { type: DataTypes.STRING, allowNull: false },
	email: { type: DataTypes.STRING, allowNull: false, unique: true },
	dateofbirth: { type: DataTypes.DATEONLY, allowNull: false },
	is_first_login: { type: DataTypes.BOOLEAN, defaultValue: true },
 }, {
	timestamps: true,
	tableName: 'Voters',
	id: false,
});

module.exports = Voter;

