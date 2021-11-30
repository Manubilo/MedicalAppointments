module.exports = (app) => {
  const doctors = require('../controllers/doctor.controller');

  var router = require('express').Router();

  //Create a new doctor
  router.post('/', doctors.create);

  //Retrieve all doctors
  router.get('/', doctors.findAll);

  //Retrieve a doctor by last name
  router.get('/:lastName', doctors.findOne);

  //Update a doctor by id
  router.put('/:id', doctors.update);

  //Delete a doctor by id
  router.delete('/:id', doctors.delete);

  //Delete all doctors
  router.delete('/', doctors.deleteAll);

  app.use('/api/doctors', router);
};
