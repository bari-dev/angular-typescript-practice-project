'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TaskListUser', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      taskListId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'TaskLists',
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

    await queryInterface.addConstraint('TaskListUser', {
      fields: ['userId', 'taskListId'],
      type: 'unique',
      name: 'uniqueUserTaskList'
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('TaskListUser');
  }
};
