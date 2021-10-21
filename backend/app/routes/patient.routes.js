module.exports = (app) => {
  const patients = require('../controllers/patient.controller');

  var router = require('express').Router();

  //Create a new patient
  router.post('/', patients.create);

  //Retrieve all patients
  router.get('/', patients.findAll);

  //Retrieve a patient by last name
  router.get('/:lastName', patients.findOne);

  //Update a patient by id
  router.put('/:id', patients.update);

  //Delete a patient by id
  router.delete('/:id', patients.delete);

  //Delete all patients
  router.delete('/', patients.deleteAll);

  app.use('/api/patients', router);
};
