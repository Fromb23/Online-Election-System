'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		// Add the voteCategoryId column
		await queryInterface.addColumn('Candidates', 'voteCategoryId', {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'VoteCategories', // Table name
				key: 'id',
			},
			onUpdate: 'CASCADE',
			onDelete: 'CASCADE',
		});
	},

	down: async (queryInterface, Sequelize) => {
		// Remove the voteCategoryId column
		await queryInterface.removeColumn('Candidates', 'voteCategoryId');
	},
};
