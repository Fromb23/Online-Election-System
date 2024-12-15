const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const County = require('./county');

const Constituency = sequelize.define('Constituency', {
  constituencyId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  countyId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: County,
      key: 'countyId',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
});

module.exports = Constituency;