module.exports = (mongoose) => {
  const Appointment = mongoose.model(
    'appointment',
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

  return Appointment;
};
