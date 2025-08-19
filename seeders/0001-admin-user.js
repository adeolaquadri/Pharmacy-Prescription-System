'use strict';
const bcrypt = require('bcryptjs');
require('dotenv').config();

const email = process.env.EMAIL;
const password = process.env.ADMIN_PASSWORD;

module.exports = {
  async up (queryInterface, Sequelize) {
    const passwordHash = await bcrypt.hash(password, 10);
    await queryInterface.bulkInsert('users', [{
      id: Sequelize.literal('gen_random_uuid()'),
      email: email,
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
