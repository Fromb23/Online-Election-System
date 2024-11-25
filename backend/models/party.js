const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Party = sequelize.define('Party', {
	partyId: { 
		type: DataTypes.INTEGER, 
		primaryKey: true, 
		autoIncrement: true 
	},
	partyName: { 
		type: DataTypes.STRING, 
		allowNull: false 
	}
}, {
	timestamps: true,
	tableName: 'Parties'
});

module.exports = Party;
