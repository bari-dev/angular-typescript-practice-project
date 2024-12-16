'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await queryInterface.sequelize.query('SELECT id FROM `Users`');
    const userIds = users[0].map(user => user.id);

    await queryInterface.bulkInsert('TaskLists', [
      {
        name: 'Personal Tasks',
        user_id: userIds[0],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Work Tasks',
        user_id: userIds[1],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Shared Tasks',
        user_id: userIds[2],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Project X',
        user_id: userIds[0],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Project Y',
        user_id: userIds[1],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('TaskLists', null, {});
  }
};
