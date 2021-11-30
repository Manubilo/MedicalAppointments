module.exports = (app) => {
  const appointments = require('../controllers/appointment.controller');

  var router = require('express').Router();

  //Create a new appointment
  router.post('/', appointments.create);

  //Retrieve all appointments
  router.get('/', appointments.findAll);

  //Find all appointments of a patient
  router.get('/:idPatient', appointments.findPatientAppointments);

  //Find all confirmed appointments of a patient
  router.get('/:idPatient/confirmed', appointments.findAllConfirmed);

  //Find all scheduled appointments of a patient
  router.get('/:idPatient/scheduled', appointments.findAllScheduled);

  //Update a appointment by id
  router.put('/:id', appointments.update);

  //Delete a appointment by id
  router.delete('/:id', appointments.delete);

  //Delete all appointments
  router.delete('/', appointments.deleteAll);

  app.use('/api/appointments', router);
};
