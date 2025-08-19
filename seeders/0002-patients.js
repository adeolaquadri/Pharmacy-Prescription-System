'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('patients', [
      { id: Sequelize.literal('gen_random_uuid()'), name: 'John Doe', email: 'john@example.com', phone: '08030000001', dateOfBirth: '1990-05-01', createdAt: new Date(), updatedAt: new Date() },
      { id: Sequelize.literal('gen_random_uuid()'), name: 'Jane Smith', email: 'jane@example.com', phone: '08030000002', dateOfBirth: '1987-11-12', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('patients', null, {});
  }
};
