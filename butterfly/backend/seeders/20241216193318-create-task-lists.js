'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query('SELECT id FROM `User`');
    const userIds = users[0].map(user => user.id);

    await queryInterface.bulkInsert('TaskList', [
      {
        name: 'Personal Tasks',
        slug: 'personal-tasks',
        creatorId: userIds[0],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Work Tasks',
        slug: 'work-tasks',
        creatorId: userIds[1],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Shared Tasks',
        slug: 'shared-tasks',
        creatorId: userIds[2],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Project X',
        slug: 'project-x',
        creatorId: userIds[0],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Project Y',
        slug: 'project-y',
        creatorId: userIds[1],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('TaskList', null, {});
  }
};
