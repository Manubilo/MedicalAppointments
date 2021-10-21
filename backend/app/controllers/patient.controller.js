const db = require('../models');
var base64 = require('base-64');
const Patient = db.patients;

//Create and save a new patient
exports.create = (req, res) => {
  //Validate request
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password
  ) {
    res.status(400).send({ message: 'Content cannot be empty' });
    return;
  }

  //Create a patient
  const patient = new Patient({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: base64.encode(req.body.password),
  });

  //Save patient in database
  patient
    .save(patient)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occured while creating the patient',
      });
    });
};

//Retrieve all patients from the database
exports.findAll = (req, res) => {
  Patient.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occured while retrieving patients',
      });
    });
};

//Find a single patient with the last name
exports.findOne = (req, res) => {
  const lastName = req.params.lastName;

  var condition = lastName
    ? { lastName: { $regex: new RegExp(lastName), $options: 'i' } }
    : {};

  Patient.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occured while retrieving the patient',
      });
    });
};

//Update an patient by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty',
    });
  }

  const id = req.params.id;

  Patient.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update patient with id=${id}. Maybe the patient was not found!`,
        });
      } else res.send({ message: 'Patient was updated successfully' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Patient with id = ' + id,
      });
    });
};

//Delete an patient with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Patient.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete patient with id=${id}. Maybe the patient was not found!`,
        });
      } else {
        res.send({
          message: 'Patient was deleted successfully',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Patient with id = ' + id,
      });
    });
};

//Delete all patients from the database
exports.deleteAll = (req, res) => {
  Patient.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} patients were deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occured while removing all patients',
      });
    });
};
