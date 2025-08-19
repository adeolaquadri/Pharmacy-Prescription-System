'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    const passwordHash = await bcrypt.hash('Admin@123', 10);
    await queryInterface.bulkInsert('users', [{
      id: Sequelize.literal('gen_random_uuid()'),
      email: 'admin@example.com',
      passwordHash,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', { email: 'admin@example.com' });
  }
};
