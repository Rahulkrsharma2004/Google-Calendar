const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
  }
});
module.exports = mongoose.model('User', userSchema);
