'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TaskUser', {
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
          model: 'User',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      taskId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Task',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      permission: {
        type: Sequelize.ENUM('admin', 'editor', 'viewer'),
        allowNull: false,
        defaultValue: 'viewer'
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

    await queryInterface.addConstraint('TaskUser', {
      fields: ['userId', 'taskId'],
      type: 'unique',
      name: 'uniqueUserTask'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TaskUser');    
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_TaskUsers_permission";');
  }
};
