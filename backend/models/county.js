const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const County = sequelize.define('County', {
  countyId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = County;