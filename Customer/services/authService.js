const User = require('../models/customer')
const bcrypt = require('bcrypt')

const authService = {
  async signup(user) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);

      const newUser = new User(user);
      newUser.password = hashedPassword;

      const savedUser = await newUser.save();
      return savedUser;
      
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
        throw new Error('Username already exists');
      } else {
        throw error;
      }
    }
  },
}

module.exports = authService