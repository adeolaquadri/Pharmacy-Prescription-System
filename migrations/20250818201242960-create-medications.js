'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

await queryInterface.createTable('medications', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.literal('gen_random_uuid()') },
  name: { type: Sequelize.STRING, allowNull: false, unique: true },
  stock: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
  unitPrice: { type: Sequelize.DECIMAL(10,2), allowNull: false },
  createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
  updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW }
});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('medications');
  }
};
