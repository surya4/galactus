const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  gender: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    enum: ['male', 'female'],
    default: 'male'
  },
  flags: {
    deleted: {
      type: Boolean,
      default: false
    }
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

UsersSchema.pre('save', next => {
  this.updated_at = new Date();
  next();
});

module.exports = mongoose.model('Users', UsersSchema);
