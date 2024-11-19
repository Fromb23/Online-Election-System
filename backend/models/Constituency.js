const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const County = require('./County');

const Constituency = sequelize.define('Constituency', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

Constituency.belongsTo(County, { foreignKey: 'countyId', as: 'county' });

module.exports = Constituency;
