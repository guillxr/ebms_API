const donorRoutes = require('./donor.routes');

const loadRoutes = (app) => {
  app.use('/donors', donorRoutes);
};

module.exports = { loadRoutes };
