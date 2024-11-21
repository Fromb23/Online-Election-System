module.exports = {
	up: async (queryInterface, Sequelize) => {
		// Add unique constraint to 'name' column in 'VoteCategories' table
		await queryInterface.changeColumn('VoteCategories', 'name', {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		});
	},

	down: async (queryInterface, Sequelize) => {
		// Remove the unique constraint if rolling back the migration
		await queryInterface.changeColumn('VoteCategories', 'name', {
			type: Sequelize.STRING,
			allowNull: false,
			unique: false,
		});
	}
};
