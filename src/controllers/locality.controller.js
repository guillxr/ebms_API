// Importing prisma.
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

class LocalityController {
  async createLocality(req, res) {
    try {
      const { street, neighborhood, zip, city, state } = req.body;
      const locality = await prisma.locality.create({
        data: { street, neighborhood, zip, city, state },
      });
      res.status(201).json(locality);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getAllLocality(req, res) {
    try {
      const locality = await prisma.locality.findMany();
      res.status(200).json(locality);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateLocality(req, res) {
    try {
      const { id } = req.params;
      const { street, neighborhood, zip, city, state } = req.body;
      const locality = await prisma.locality.update({
        where: { id: Number(id) },
        data: { street, neighborhood, zip, city, state },
      });
      res.status(200).json(locality);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deletLocality(req, res) {
    try {
      const { id } = req.params;
      await prisma.locality.delete({
        where: { id: Number(id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = new LocalityController();
