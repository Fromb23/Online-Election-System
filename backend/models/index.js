'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

// Initialize Sequelize instance
const sequelize = new Sequelize(
	config.database,
	config.username,
	config.password,
	config
);

// Import models manually
const Candidate = require('./candidate');
const VoteCategory = require('./voteCategory');

// Setup associations
Candidate.belongsTo(VoteCategory, {
	foreignKey: 'candidateId',
});
VoteCategory.hasMany(Candidate, {
	foreignKey: 'voteCategoryId',
});

// Add models to the `db` object
db.Candidate = Candidate;
db.VoteCategory = VoteCategory;

// Automatically import and initialize other models in the folder
fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf('.') !== 0 &&
			file !== basename &&
			file.slice(-3) === '.js' &&
			file.indexOf('.test.js') === -1
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file));
		db[model.name] = model;
	});

// Call associate methods on models if they exist
Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

// Add Sequelize and sequelize to the `db` object for exporting
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
