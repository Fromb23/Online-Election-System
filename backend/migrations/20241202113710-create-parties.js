'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Parties', {
			partyId: { 
				type: Sequelize.INTEGER, 
				primaryKey: true, 
				autoIncrement: true 
			},
			partyName: { 
				type: Sequelize.STRING, 
				allowNull: false 
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
		await queryInterface.dropTable('Parties');
	},
};
