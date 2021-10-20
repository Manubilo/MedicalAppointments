const dbConfig = require('../config/db.config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.appointments = require('./appointments.model.js')(mongoose);
db.patients = require('./patients.model.js')(mongoose);
db.doctors = require('./doctors.model.js')(mongoose);

module.exports = db;
