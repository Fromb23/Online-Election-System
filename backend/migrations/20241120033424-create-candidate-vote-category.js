'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('CandidateVoteCategories', {
			candidateId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Candidates', // the model that this column is referencing
					key: 'id',
				},
				allowNull: false, // You can decide whether this should be nullable
			},
			voteCategoryId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'VoteCategories', // the model that this column is referencing
					key: 'id',
				},
				allowNull: false, // You can decide whether this should be nullable
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('CandidateVoteCategories');
	}
};
