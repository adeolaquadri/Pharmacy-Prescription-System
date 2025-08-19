'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('medications', [
      { id: Sequelize.literal('gen_random_uuid()'), name: 'Amoxicillin', stock: 25, unitPrice: 1200.00, createdAt: new Date(), updatedAt: new Date() },
      { id: Sequelize.literal('gen_random_uuid()'), name: 'Paracetamol', stock: 200, unitPrice: 100.00, createdAt: new Date(), updatedAt: new Date() },
      { id: Sequelize.literal('gen_random_uuid()'), name: 'Ibuprofen', stock: 15, unitPrice: 250.00, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('medications', null, {});
  }
};
