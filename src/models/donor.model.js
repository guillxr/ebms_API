const prisma = require('@config').prisma;

const Donor = {
  create: async (data) => {
    try {
      return await prisma.donor.create({ data });
    } catch (error) {
      console.error('Prisma error on create:', error);
      if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
        throw new Error('Email already exists');
      }
      throw error;
    }
  },

  findAll: async () => {
    try {
      return await prisma.donor.findMany();
    } catch (error) {
      console.error('Prisma error on find all donors:', error);
      throw error;
    }
  },

  findById: async (id) => {
    try {
      return await prisma.donor.findUnique({ where: { id } });
    } catch (error) {
      console.error('Prisma error on find to donor:', error);
      throw error;
    }
  },

  findByBloodType: async (bloodType) => {
    try {
      return await prisma.donor.findMany({
        where: {
          blood_type: {
            contains: bloodType,
            mode: 'insensitive',
          },
        },
      });
    } catch (error) {
      console.error('Prisma error on find by blood type:', error);
      throw error;
    }
  },

  update: async (id, data) => {
    try {
      return await prisma.donor.update({
        where: { id },
        data,
      });
    } catch (error) {
      console.error('Prisma error on update:', error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      return await prisma.donor.delete({ where: { id } });
    } catch (error) {
      console.error('Prisma error on delete:', error);
      throw error;
    }
  },
};

module.exports = Donor;
