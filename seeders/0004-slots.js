'use strict';
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('appointmentSlots', [
      { id: Sequelize.literal('gen_random_uuid()'), date: '2025-08-20', time: '09:00', serviceType: 'consultation', isBooked: false, createdAt: new Date(), updatedAt: new Date() },
      { id: Sequelize.literal('gen_random_uuid()'), date: '2025-08-20', time: '10:00', serviceType: 'pickup', isBooked: false, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('appointmentSlots', null, {});
  }
};
