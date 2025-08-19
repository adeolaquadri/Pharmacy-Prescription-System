'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

await queryInterface.createTable('appointmentSlots', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.literal('gen_random_uuid()') },
  date: { type: Sequelize.DATEONLY, allowNull: false },
  time: { type: Sequelize.STRING, allowNull: false },
  serviceType: { type: Sequelize.ENUM('consultation','pickup'), allowNull: false },
  isBooked: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
  updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW }
});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('appointmentSlots');
  }
};
