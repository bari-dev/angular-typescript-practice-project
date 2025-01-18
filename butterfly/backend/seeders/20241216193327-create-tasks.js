'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const taskLists = await queryInterface.sequelize.query('SELECT id from `TaskList`');
    const users = await queryInterface.sequelize.query('SELECT id from `User`');
    const taskListIds = taskLists[0].map(taskList => taskList.id);
    const userIds = users[0].map(user => user.id);

    await queryInterface.bulkInsert('Task', [
      {
        title: 'Buy groceries',
        slug: 'buy-groceries',
        description: 'Buy fruits and vegetables for the week',
        completed: false,
        deadline: new Date('2024-12-20T12:00:00Z'),
        taskListId: taskListIds[0],
        creatorId: userIds[0],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Finish report',
        slug: 'finish-report',
        description: 'Complete the quarterly report for the company',
        completed: false,
        deadline: new Date('2024-12-25T12:00:00Z'),
        taskListId: taskListIds[1],
        creatorId: userIds[1],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Attend meeting',
        slug: 'attend-meeting',
        description: 'Attend the weekly team sync',
        completed: true,
        deadline: new Date('2024-12-15T09:00:00Z'),
        taskListId: taskListIds[2],
        creatorId: userIds[2],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Complete code review',
        slug: 'complete-code-review',
        description: 'Review code for the new feature in Project X',
        completed: false,
        deadline: new Date('2024-12-22T18:00:00Z'),
        taskListId: taskListIds[3],
        creatorId: userIds[0],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'On Production',
        slug: 'on-production',
        description: 'Review code for the new feature in Project X',
        completed: false,
        deadline: new Date('2024-12-22T18:00:00Z'),
        taskListId: taskListIds[3],
        creatorId: userIds[0],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Task', null, {});
  }
};
