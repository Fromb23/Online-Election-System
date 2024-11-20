const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Candidate = sequelize.define('Candidate', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  party: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Candidate;