const User = require('../models/customer')
const bcrypt = require('bcrypt')

const profileService = {
    updateUser(id, body) {
        const user = User.findByIdAndUpdate(id, body)
        return user
    },

    checkPassword: async(curPass, hashPass) => {
        const passwordMatch = bcrypt.compare(curPass, hashPass)
        return passwordMatch
    },

    resetPassword: async(id, newPassword) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        return User.findByIdAndUpdate(id, {password: hashedPassword})
    },
}

module.exports = profileService