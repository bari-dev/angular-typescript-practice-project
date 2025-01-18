'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Saleforce',{
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id',
        },
        onDelete: 'CASCADE'
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      accessToken: {
        type: Sequelize.STRING,
        allowNull: false
      },
      refreshToken: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      instanceUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      issueAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      creaatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Saleforce')
  }
};
