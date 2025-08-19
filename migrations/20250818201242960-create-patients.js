'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

await queryInterface.createTable('patients', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.literal('gen_random_uuid()') },
  name: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false, unique: true },
  phone: { type: Sequelize.STRING, allowNull: false },
  dateOfBirth: { type: Sequelize.DATEONLY, allowNull: false },
  createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
  updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW }
});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('patients');
  }
};
