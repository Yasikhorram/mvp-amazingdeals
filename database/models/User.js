const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

  firstName: String,
  lastName: String,
  email: String,
  userPassword: String,
  userType: {

    type: String,
    enum: ['customer', 'bpartner', 'admin']
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
