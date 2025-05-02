const donorModel = require('@models/donor.model');

const DonorService = {
  createDonor: async (data) => {
    if (!data.name || !data.blood_type) {
      throw new Error('Name and blood type are required');
    }

    const allowedFields = [
      'name',
      'birth_date',
      'blood_type',
      'gender',
      'phone',
      'email',
      'identity_document',
      'address',
      'latitude',
      'longitude',
      'last_donation',
      'donation_frequency',
      'eligibility_status',
      'contact_preferences',
    ];

    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key]) => allowedFields.includes(key))
    );

    if (filteredData.birth_date) {
      filteredData.birth_date = new Date(filteredData.birth_date);
    }
    if (filteredData.last_donation) {
      filteredData.last_donation = new Date(filteredData.last_donation);
    }

    return await donorModel.create(filteredData);
  },

  getAllDonors: async () => {
    return await donorModel.findAll();
  },

  getDonorById: async (id) => {
    const donor = await donorModel.findById(id);
    if (!donor) {
      throw new Error('Donor not found');
    }
    return donor;
  },

  getByBloodType: async (bloodType) => {
    if (!bloodType) {
      throw new Error('Blood type is required');
    }
    return await donorModel.findByBloodType(bloodType);
  },

  updateDonor: async (id, data) => {
    if (!id) throw new Error('ID is required');
    if (!data) throw new Error('Update data is required');

    return await donorModel.update(id, data);
  },

  deleteDonor: async (id) => {
    if (!id) throw new Error('ID is required');
    return await donorModel.delete(id);
  },
};

module.exports = DonorService;
