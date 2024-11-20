'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Voters', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			voterId: {
				type: Sequelize.STRING,
				allowNull: false
			},
			fullName: {
				type: Sequelize.STRING,
				allowNull: false
			},
			constituency: {
				type: Sequelize.STRING,
				allowNull: false
			},
			voted: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Voters');
	}
};
