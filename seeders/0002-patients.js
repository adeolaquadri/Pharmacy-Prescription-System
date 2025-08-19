'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('patients', [
      { id: Sequelize.literal('gen_random_uuid()'), name: 'Adeola Quadri', email: 'adeola@gmail.com', phone: '08123456789', dateOfBirth: '1990-05-01', createdAt: new Date(), updatedAt: new Date() },
      { id: Sequelize.literal('gen_random_uuid()'), name: 'Adeyemi Akorede', email: 'akorede@gmail.com', phone: '08157486374', dateOfBirth: '1987-11-12', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('patients', null, {});
  }
};
