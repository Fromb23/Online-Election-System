'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.removeColumn('Voters', 'id'); // Remove the auto-generated ID column
		await queryInterface.changeColumn('Voters', 'voterId', {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: true, // Make voterId the primary key
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.addColumn('Voters', 'id', {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false,
		});
		await queryInterface.changeColumn('Voters', 'voterId', {
			type: Sequelize.STRING,
			allowNull: false,
			primaryKey: false,
		});
	},
};
