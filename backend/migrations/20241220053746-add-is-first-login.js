'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Voters', 'is_first_login', {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Voters', 'is_first_login');
  }
};
