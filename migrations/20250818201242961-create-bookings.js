'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

await queryInterface.createTable('bookings', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.literal('gen_random_uuid()') },
  slotId: { type: Sequelize.UUID, allowNull: false, references: { model: 'appointmentSlots', key: 'id' } },
  patientId: { type: Sequelize.UUID, allowNull: false, references: { model: 'patients', key: 'id' } },
  status: { type: Sequelize.ENUM('booked','cancelled'), allowNull: false, defaultValue: 'booked' },
  createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
  updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW }
});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('bookings');
  }
};
