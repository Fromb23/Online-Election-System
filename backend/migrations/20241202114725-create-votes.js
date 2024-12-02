'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Votes', {
			voteId: {
				type: Sequelize.STRING,
				primaryKey: true,
			},
			VoterId: {
				type: Sequelize.STRING,
				allowNull: false,
				references: {
					model: 'Voters', // Refers to the table 'Voters'
					key: 'voterId',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			CandidateId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Candidates', // Refers to the table 'Candidates'
					key: 'candidateId',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			VoteCategoryId: {
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
		await queryInterface.dropTable('Votes');
	},
};
