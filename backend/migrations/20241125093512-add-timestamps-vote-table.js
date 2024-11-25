'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Votes', {
			voteId: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			VoterId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Voters',
					key: 'voterId',
				},
				onDelete: 'CASCADE',
			},
			CandidateId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Candidates',
					key: 'candidateId',
				},
				onDelete: 'CASCADE',
			},
			VoteCategoryId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'VoteCategories',
					key: 'voteCategoryId',
				},
				onDelete: 'CASCADE',
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Votes');
	},
};
