const db = require('../models');
var base64 = require('base-64');
const Doctor = db.doctors;

//Create and save a new doctor
exports.create = (req, res) => {
  //Validate request
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.password ||
    !req.body.description
  ) {
    res.status(400).send({ message: 'Content cannot be empty' });
    return;
  }

  //Create a doctor
  const doctor = new Doctor({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: base64.encode(req.body.password),
    description: req.body.description,
  });

  //Save doctor in database
  doctor
    .save(doctor)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occured while creating the doctor',
      });
    });
};

//Retrieve all doctors from the database
exports.findAll = (req, res) => {
  Doctor.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occured while retrieving doctors',
      });
    });
};

//Find a single doctor with the last name
exports.findOne = (req, res) => {
  const lastName = req.params.lastName;

  var condition = lastName
    ? { lastName: { $regex: new RegExp(lastName), $options: 'i' } }
    : {};

  Doctor.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occured while retrieving the doctor',
      });
    });
};

//Update an doctor by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty',
    });
  }

  const id = req.params.id;

  Doctor.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update doctor with id=${id}. Maybe the doctor was not found!`,
        });
      } else res.send({ message: 'Doctor was updated successfully' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating doctor with id = ' + id,
      });
    });
};

//Delete an doctor with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Doctor.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete doctor with id=${id}. Maybe the doctor was not found!`,
        });
      } else {
        res.send({
          message: 'Doctor was deleted successfully',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Doctor with id = ' + id,
      });
    });
};

//Delete all doctors from the database
exports.deleteAll = (req, res) => {
  Doctor.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} doctors were deleted successfully`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occured while removing all doctors',
      });
    });
};
