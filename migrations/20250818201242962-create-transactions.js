'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

await queryInterface.createTable('transactions', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.literal('gen_random_uuid()') },
  walletId: { type: Sequelize.UUID, allowNull: false, references: { model: 'wallets', key: 'id' }, onDelete: 'CASCADE' },
  type: { type: Sequelize.ENUM('credit','debit'), allowNull: false },
  amount: { type: Sequelize.DECIMAL(10,2), allowNull: false },
  description: { type: Sequelize.STRING, allowNull: false },
  createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
  updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW }
});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  }
};
