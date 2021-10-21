var mongoose = require('mongoose');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    mongoose.Schema(
      {
        idPatient: [{ type: Schema.Types.ObjectId, ref: 'Patient' }],
        idDoctor: [{ type: Schema.Types.ObjectId, ref: 'Doctor' }],
        datetime: Date,
        status: String,
      },
      { timestamps: true }
    )
  );

  schema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Appointment = mongoose.model('appointment', schema);
  return Appointment;
};
