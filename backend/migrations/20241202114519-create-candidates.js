'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Candidates', {
			candidateId: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			candidateName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			PartyId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Parties', // Refers to the table 'Parties'
					key: 'partyId',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			voted: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			voteCategoryId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'VoteCategories', // Refers to the table 'VoteCategories'
					key: 'voteCategoryId',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
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
		await queryInterface.dropTable('Candidates');
	},
};
