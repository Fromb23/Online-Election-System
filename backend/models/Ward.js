const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Constituency = require('./Constituency');

const Ward = sequelize.define('Ward', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

Ward.belongsTo(Constituency, { foreignKey: 'constituencyId', as: 'constituency' });

module.exports = Ward;
