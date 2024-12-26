'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const taskLists = await queryInterface.sequelize.query('SELECT id from `TaskLists`');
    const users = await queryInterface.sequelize.query('SELECT id from `Users`');
    const taskListIds = taskLists[0].map(taskList => taskList.id);
    const userIds = users[0].map(user => user.id);

    await queryInterface.bulkInsert('TaskListUser', [
      { userId: userIds[0], taskListId: taskListIds[0], createdAt: new Date(), updatedAt: new Date() },
      { userId: userIds[1], taskListId: taskListIds[1], createdAt: new Date(), updatedAt: new Date() },
      { userId: userIds[2], taskListId: taskListIds[2], createdAt: new Date(), updatedAt: new Date() },
      { userId: userIds[0], taskListId: taskListIds[3], createdAt: new Date(), updatedAt: new Date() },
      { userId: userIds[1], taskListId: taskListIds[4], createdAt: new Date(), updatedAt: new Date() },
      { userId: userIds[2], taskListId: taskListIds[0], createdAt: new Date(), updatedAt: new Date() },
      { userId: userIds[1], taskListId: taskListIds[0], createdAt: new Date(), updatedAt: new Date() },
      { userId: userIds[0], taskListId: taskListIds[2], createdAt: new Date(), updatedAt: new Date() } 
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('TaskListUser', null, {});
  }
};
