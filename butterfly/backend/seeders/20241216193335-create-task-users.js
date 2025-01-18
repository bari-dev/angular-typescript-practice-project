"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const tasks = await queryInterface.sequelize.query(
      "SELECT id from `Task`"
    );
    const users = await queryInterface.sequelize.query(
      "SELECT id from `User`"
    );
    const tasksIds = tasks[0].map((task) => task.id);
    const userIds = users[0].map((user) => user.id);

    await queryInterface.bulkInsert("TaskUser", [
      {
        userId: userIds[0],
        taskId: tasksIds[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: userIds[1],
        taskId: tasksIds[1],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: userIds[2],
        taskId: tasksIds[2],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: userIds[0],
        taskId: tasksIds[3],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: userIds[1],
        taskId: tasksIds[4],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: userIds[2],
        taskId: tasksIds[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: userIds[1],
        taskId: tasksIds[0],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: userIds[0],
        taskId: tasksIds[2],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("TaskUser", null, {});
  },
};
