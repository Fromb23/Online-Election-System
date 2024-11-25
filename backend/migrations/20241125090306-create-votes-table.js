'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Votes', {
            voteId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            VoterId: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'Voters', // Ensure 'Voters' table exists
                    key: 'voterId', // Primary key of the `Voters` table
                },
                onDelete: 'CASCADE',
            },
            CandidateId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'Candidates', // Ensure 'Candidates' table exists
                    key: 'candidateId', // Primary key of the `Candidates` table
                },
                onDelete: 'CASCADE',
            },
            VoteCategoryId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'VoteCategories', // Ensure 'VoteCategories' table exists
                    key: 'voteCategoryId', // Primary key of the `VoteCategories` table
                },
                onDelete: 'CASCADE',
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Votes');
    },
};

