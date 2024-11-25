'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		// Remove the existing id column
		await queryInterface.removeColumn('Candidates', 'id');

		// Add the new candidateId column as the primary key
		await queryInterface.addColumn('Candidates', 'candidateId', {
			type: Sequelize.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		});
	},

	async down(queryInterface, Sequelize) {
		// Revert back to the original id field
		await queryInterface.addColumn('Candidates', 'id', {
			type: Sequelize.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		});

		// Remove the candidateId column
		await queryInterface.removeColumn('Candidates', 'candidateId');
	},
};
