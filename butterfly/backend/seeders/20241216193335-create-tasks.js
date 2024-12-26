'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const taskLists = await queryInterface.sequelize.query('SELECT id from `TaskLists`');
    const users = await queryInterface.sequelize.query('SELECT id from `Users`');
    const taskListIds = taskLists[0].map(taskList => taskList.id);
    const userIds = users[0].map(user => user.id);

    await queryInterface.bulkInsert('Tasks', [
      {
        title: 'Buy groceries',
        description: 'Buy fruits and vegetables for the week',
        completed: false,
        deadline: new Date('2024-12-20T12:00:00Z'),
        taskListId: taskListIds[0],
        assignedToUserId: userIds[0],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Finish report',
        description: 'Complete the quarterly report for the company',
        completed: false,
        deadline: new Date('2024-12-25T12:00:00Z'),
        taskListId: taskListIds[1],
        assignedToUserId: userIds[1],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Attend meeting',
        description: 'Attend the weekly team sync',
        completed: true,
        deadline: new Date('2024-12-15T09:00:00Z'),
        taskListId: taskListIds[2],
        assignedToUserId: userIds[2],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Complete code review',
        description: 'Review code for the new feature in Project X',
        completed: false,
        deadline: new Date('2024-12-22T18:00:00Z'),
        taskListId: taskListIds[3],
        assignedToUserId: userIds[0],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
