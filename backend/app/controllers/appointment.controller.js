const db = require('../models');
const Appointment = db.appointments;
const Doctor = db.doctors;
const Patient = db.patients;
const doctors = require('../controllers/doctor.controller');
const patients = require('../controllers/patient.controller');

//Create and save a new Appointment
exports.create = (req, res) => {
  //Validate request
  if (!req.body.idPatient || !req.body.datetime || !req.body.status) {
    res.status(400).send({ message: 'Content cannot be empty' });
    return;
  }

  //Create an appointment
  const appointment = new Appointment({
    idPatient: req.body.idPatient,
    datetime: req.body.datetime,
    status: req.body.status,
  });

  //Save appointment in database
  appointment
    .save(appointment)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occured while creating the appointment',
      });
    });
};

//Retrieve all Appointments from the database
exports.findAll = (req, res) => {
  Appointment.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occured while retrieving appointments',
      });
    });
};

//Find all appointments of a patient
exports.findPatientAppointments = (req, res) => {
  const idPatient = req.params.idPatient;

  Appointment.find({ idPatient: idPatient })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occured while retrieving appointments',
      });
    });
};

//Find all scheduled appointments of a patient
exports.findAllScheduled = (req, res) => {
  const idPatient = req.params.idPatient;
  Appointment.find({ idPatient: idPatient, status: 'Scheduled' })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occured while retrieving appointments',
      });
    });
};

//Find all confirmed appointments of a patient
exports.findAllConfirmed = (req, res) => {
  const idPatient = req.params.idPatient;
  Appointment.find({ idPatient: idPatient, status: 'Confirmed' })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occured while retrieving appointments',
      });
    });
};

//Update an appointment by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty',
    });
  }

  const id = req.params.id;

  Appointment.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update appointment with id=${id}. Maybe the appointment was not found!`,
        });
      } else res.send({ message: 'Appointment was updated successfully' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Appointment with id = ' + id,
      });
    });
};

//Delete an appointment with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Appointment.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete appointment with id=${id}. Maybe the appointment was not found!`,
        });
      } else {
        res.send({
          message: 'Appointment was deleted successfully',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Appointment with id = ' + id,
      });
    });
};

//Delete all appointments from the database
exports.deleteAll = (req, res) => {
  Appointment.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} appointments were deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occured while removing all appointments',
      });
    });
};
