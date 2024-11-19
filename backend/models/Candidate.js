const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Voter = require('./Voter');
const VoteCategory = require('./VoteCategory');

const Candidate = sequelize.define('Candidate', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  party: { type: DataTypes.STRING, allowNull: false },
});

Candidate.belongsTo(Voter, { foreignKey: 'voterId', as: 'voter' });
Candidate.belongsTo(VoteCategory, { foreignKey: 'categoryId', as: 'category' });

module.exports = Candidate;
