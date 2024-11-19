const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const County = sequelize.define('County', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
});

module.exports = County;
