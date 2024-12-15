const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Constituency = require('./constituency');

const PollingStation = sequelize.define('PollingStation', {
  pollingStationId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  constituencyId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Constituency,
      key: 'constituencyId',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
});

module.exports = PollingStation;