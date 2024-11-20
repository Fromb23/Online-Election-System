'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('VoteCategories', {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('VoteCategories');
	}
};
