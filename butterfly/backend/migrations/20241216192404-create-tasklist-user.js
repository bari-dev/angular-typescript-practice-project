'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TaskListUser', {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Reference to Users table
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      task_list_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'TaskLists', // Reference to TaskLists table
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
    });

    // Adding composite unique key to ensure no duplicate associations
    await queryInterface.addConstraint('TaskListUser', {
      fields: ['user_id', 'task_list_id'],
      type: 'unique',
      name: 'unique_user_task_list'
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('TaskListUser');
  }
};
