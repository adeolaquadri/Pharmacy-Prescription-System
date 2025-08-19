'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

await queryInterface.createTable('users', {
  id: { type: Sequelize.UUID, primaryKey: true, defaultValue: Sequelize.literal('gen_random_uuid()') },
  email: { type: Sequelize.STRING, allowNull: false, unique: true },
  passwordHash: { type: Sequelize.STRING, allowNull: false },
  role: { type: Sequelize.ENUM('admin','user'), allowNull: false, defaultValue: 'user' },
  createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
  updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW }
});

  },

  async down (queryInterface, Sequelize) {

await queryInterface.dropTable('users');

  }
};
