const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  registration_date: { type: Date, default: Date.now },
  phone: { type: String },
  last_active_date: { type: Date },
  actions_history: {
    viewed_surveys: [{ survey_id: String, title: String, timestamp: Date }],
    completed_surveys: [{ survey_id: String, title: String, completion_rate: String, timestamp: Date }],
    created_surveys: [{ survey_id: String, title: String, timestamp: Date }],
    deleted_surveys: [{ survey_id: String, title: String, timestamp: Date }]
  }
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
