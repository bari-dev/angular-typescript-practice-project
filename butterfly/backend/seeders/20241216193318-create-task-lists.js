'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query('SELECT id FROM `Users`');
    const userIds = users[0].map(user => user.id);

    await queryInterface.bulkInsert('TaskLists', [
      {
        name: 'Personal Tasks',
        slug: 'personal-tasks',
        userId: userIds[0],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Work Tasks',
        slug: 'work-tasks',
        userId: userIds[1],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Shared Tasks',
        slug: 'shared-tasks',
        userId: userIds[2],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Project X',
        slug: 'project-x',
        userId: userIds[0],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Project Y',
        slug: 'project-y',
        userId: userIds[1],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('TaskLists', null, {});
  }
};
