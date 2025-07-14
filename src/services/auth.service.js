const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const log = require('../utils/logger');
const { prisma } = require('../../prisma/client');
const { jwtSecret } = require('@config');

const authService = {
  /**
   * Authenticates a user by email and password.
   *
   * @async
   * @function findUser
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{token: string, user: object}>}
   */
  findUser: async (email, password) => {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        donor: true,
        admin: true,
      },
    });

    if (!user) {
      log(`Login failed: user not found for ${email}`, 'warn');
      throw new Error('User not found');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      log(`Login failed: invalid password for ${email}`, 'warn');
      throw new Error('Invalid password');
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      jwtSecret,
      { expiresIn: '1d' }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        donor: user.donor,
        admin: user.admin,
      },
    };
  },

  /**
   * Creates a new user and associated role (donor or admin).
   *
   * @async
   * @function createUser
   * @param {string} email
   * @param {string} password
   * @param {string} role
   * @param {object} donorData
   * @param {object} adminData
   * @returns {Promise<object>}
   */
  createUser: async (email, password, role, donorData = null, adminData = null) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        donor: role === 'DONOR' && donorData ? { create: donorData } : undefined,
        admin: role === 'ADMIN' && adminData ? { create: adminData } : undefined,
      },
      include: {
        donor: true,
        admin: true,
      },
    });

    log(`User created: ${email} (${role})`, 'info');
    return user;
  },
};

module.exports = authService;
