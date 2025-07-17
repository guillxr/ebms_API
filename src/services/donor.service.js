const { prisma } = require('../../prisma/client');
const log = require('../utils/logger');

const DonorService = {
  getAllDonors: async () => {
    return await prisma.donor.findMany();
  },

  getDonorById: async (id) => {
    let donor = await prisma.donor.findUnique({ where: { id } });

    if (!donor) {
      log(`Donor with ID ${id} not found. Trying by userId...`, 'info');
      donor = await prisma.donor.findUnique({ where: { userId: id } });
    }

    if (!donor) {
      log(`Donor with ID or userId ${id} not found.`, 'warn');
      throw new Error('Donor not found');
    }

    return donor;
  },

  getByBloodType: async (bloodType) => {
    if (!bloodType) {
      log('Blood type is required to search donors.', 'error');
      throw new Error('Blood type is required');
    }

    return await prisma.donor.findMany({ where: { blood_type: bloodType } });
  },

  updateDonor: async (id, data) => {
    if (!id) throw new Error('ID is required');
    if (!data) throw new Error('Update data is required');

    return await prisma.donor.update({
      where: { id },
      data,
    });
  },

  deleteDonor: async (id) => {
    if (!id) throw new Error('ID is required');

    const donor = await prisma.donor.findUnique({ where: { id } });

    if (!donor) {
      log(`Donor with ID ${id} not found`, 'warn');
      throw new Error('Donor not found');
    }

    // Transação para deletar donor + user juntos
    await prisma.$transaction([
      prisma.donor.delete({ where: { id } }),
      prisma.user.delete({ where: { id: donor.userId } }),
    ]);

    log(`Donor ${id} and user ${donor.userId} deleted.`, 'info');
  },
};

module.exports = DonorService;