'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Candidates', {
			candidateId: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false
			},
			candidateName: {
				type: Sequelize.STRING,
				allowNull: false
			},
			PartyId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Parties',
					key: 'partyId'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			voted: {
				type: Sequelize.BOOLEAN,
				defaultValue: false,
				allowNull: false
			},
			voteCategoryId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'VoteCategories',
					key: 'voteCategoryId'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE'
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false
			}
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable('Candidates');
	}
};
