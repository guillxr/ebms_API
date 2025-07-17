const log = require('../utils/logger');
const { prisma } = require('../../prisma/client');

const Donor = {
  findAll: async () => {
    try {
      log('Finding all donors...', 'info');
      return await prisma.donor.findMany();
    } catch (error) {
      log(`Prisma error on find all donors: ${error}`, 'error');
      throw error;
    }
  },

  findById: async (id) => {
    try {
      log(`Finding donor with ID: ${id}...`, 'info');
      return await prisma.donor.findUnique({ where: { id } });
    } catch (error) {
      log(`Prisma error on find donor by ID: ${error}`, 'error');
      throw error;
    }
  },
  
  findByUserId: async (userId) => {
    try {
      log(`Finding donor with userId: ${userId}...`, 'info');
      return await prisma.donor.findFirst({
        where: { userId },
      });
    } catch (error) {
      log(`Prisma error on find donor by userId: ${error}`, 'error');
      throw error;
    }
  },

  findByBloodType: async (bloodType) => {
    try {
      log(`Finding donors with blood type: ${bloodType}...`, 'info');
      return await prisma.donor.findMany({
        where: {
          blood_type: bloodType,
        },
      });
    } catch (error) {
      log(`Prisma error on find by blood type: ${error}`, 'error');
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      log(`Updating donor with ID: ${id}...`, 'info');
      return await prisma.donor.update({
        where: { id },
        data,
      });
    } catch (error) {
      log(`Prisma error on update: ${error}`, 'error');
      throw error;
    }
  },

  delete: async (id) => {
    try {
      log(`Deleting donor with ID: ${id}...`, 'info');
      const existingUser = await prisma.donor.findUnique({
        where: { id },
      });

      if (!existingUser) {
        log('Donor deletion failed: donor not found', 'warn');
        throw new Error('Donor not found');
      }

      return await prisma.donor.delete({ where: { id } });
    } catch (error) {
      log(`Prisma error on delete: ${error}`, 'error');
      throw error;
    }
  },
};

module.exports = Donor;
