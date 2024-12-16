'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const taskLists = await queryInterface.sequelize.query('SELECT id from `TaskLists`');
    const users = await queryInterface.sequelize.query('SELECT id from `Users`');
    const taskListIds = taskLists[0].map(taskList => taskList.id);
    const userIds = users[0].map(user => user.id);

    await queryInterface.bulkInsert('TaskListUser', [
      { user_id: userIds[0], task_list_id: taskListIds[0], createdAt: new Date(), updatedAt: new Date() },
      { user_id: userIds[1], task_list_id: taskListIds[1], createdAt: new Date(), updatedAt: new Date() },
      { user_id: userIds[2], task_list_id: taskListIds[2], createdAt: new Date(), updatedAt: new Date() },
      { user_id: userIds[0], task_list_id: taskListIds[3], createdAt: new Date(), updatedAt: new Date() },
      { user_id: userIds[1], task_list_id: taskListIds[4], createdAt: new Date(), updatedAt: new Date() },
      { user_id: userIds[2], task_list_id: taskListIds[0], createdAt: new Date(), updatedAt: new Date() },
      { user_id: userIds[1], task_list_id: taskListIds[0], createdAt: new Date(), updatedAt: new Date() },
      { user_id: userIds[0], task_list_id: taskListIds[2], createdAt: new Date(), updatedAt: new Date() } 
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('TaskListUser', null, {});
  }
};
