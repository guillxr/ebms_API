const donorService = require('@services/donor.service');

const donorController = {
  create: async (req, res) => {
    try {
      const donor = await donorService.createDonor(req.body);
      res.status(201).json({
        message: 'Donor created successfully!',
        data: donor,
      });
    } catch (err) {
      res.status(400).json({
        error: 'Error creating donor',
        details: err.message,
      });
    }
  },

  getAll: async (req, res) => {
    try {
      const donors = await donorService.getAllDonors();
      res.status(200).json(donors);
    } catch (err) {
      res.status(500).json({
        error: 'Error fetching donors',
        details: err.message,
      });
    }
  },

  getById: async (req, res) => {
    try {
      const donor = await donorService.getDonorById(req.params.id);
      res.status(200).json(donor);
    } catch (err) {
      res.status(404).json({
        error: 'Donor not found',
        details: err.message,
      });
    }
  },

  getByBloodType: async (req, res) => {
    try {
      const donors = await donorService.getByBloodType(req.params.bloodType);
      res.status(200).json(donors);
    } catch (err) {
      res.status(400).json({
        error: 'Error fetching donors by blood type',
        details: err.message,
      });
    }
  },

  update: async (req, res) => {
    try {
      const donor = await donorService.updateDonor(req.params.id, req.body);
      res.status(200).json({
        message: 'Donor updated successfully',
        data: donor,
      });
    } catch (err) {
      res.status(400).json({
        error: 'Error updating donor',
        details: err.message,
      });
    }
  },

  delete: async (req, res) => {
    try {
      await donorService.deleteDonor(req.params.id);
      res.status(200).json({
        message: 'Donor deleted successfully',
      });
    } catch (err) {
      res.status(400).json({
        error: 'Error deleting donor',
        details: err.message,
      });
    }
  },
};

module.exports = donorController;
