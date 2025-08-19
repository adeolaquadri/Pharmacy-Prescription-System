'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

await queryInterface.createTable('prescriptions', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.literal('gen_random_uuid()') },
  patientId: { type: Sequelize.UUID, allowNull: false, references: { model: 'patients', key: 'id' }, onDelete: 'CASCADE' },
  medicationId: { type: Sequelize.UUID, allowNull: false, references: { model: 'medications', key: 'id' } },
  dosage: { type: Sequelize.STRING, allowNull: false },
  quantity: { type: Sequelize.INTEGER, allowNull: false },
  status: { type: Sequelize.ENUM('pending','filled','picked-up'), allowNull: false, defaultValue: 'pending' },
  totalPrice: { type: Sequelize.DECIMAL(10,2), allowNull: false, defaultValue: 0 },
  createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
  updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW }
});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('prescriptions');
  }
};
