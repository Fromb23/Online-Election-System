'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Voters', {
			voterId: {
				type: Sequelize.STRING,
				primaryKey: true,
				allowNull: false,
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
				defaultValue: Sequelize.fn('NOW'),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn('NOW'),
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Voters');
	},
};
