'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('Candidates', {
			candidateId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			candidateName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			party: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			voted: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
			},
			voteCategoryId: {
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
				defaultValue: Sequelize.NOW,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW,
			}
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Candidates');
	}
};
