module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn('VoteCategories', 'createdAt', {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		});

		await queryInterface.addColumn('VoteCategories', 'updatedAt', {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn('VoteCategories', 'createdAt');
		await queryInterface.removeColumn('VoteCategories', 'updatedAt');
	},
};

