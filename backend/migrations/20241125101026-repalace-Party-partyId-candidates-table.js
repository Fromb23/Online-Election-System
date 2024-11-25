'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Candidates', {
			candidateId: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			candidateName: {
				type: Sequelize.STRING,
				allowNull: false
			},
			PartyId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Parties',
					key: 'partyId'
				}
			},
			voted: {
				type: Sequelize.BOOLEAN,
				defaultValue: false
			},
			voteCategoryId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'VoteCategories',
					key: 'voteCategoryId'
				}
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn('now')
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.fn('now')
			}
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Candidates');
	}
};
