'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('TasklistMember', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      memberId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      tasklistId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'TaskList',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })

    await queryInterface.addConstraint('TasklistMember', {
      fields: ['tasklistId', 'memberId'],
      type: 'unique',
      name: 'uniqueTasklistMember'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('TasklistMember');
  }
};
