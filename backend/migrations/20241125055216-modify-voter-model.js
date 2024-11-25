'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		// Alter the 'Voters' table
		await queryInterface.createTable('Voters', {
			voterId: {
				type: Sequelize.STRING,
				allowNull: false,
				primaryKey: true,  // Set 'voterId' as the primary key
			},
			fullName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			constituency: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			voted: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		// Revert the changes in case of rollback
		await queryInterface.dropTable('Voters');
	}
};
