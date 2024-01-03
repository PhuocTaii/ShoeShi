const mongoose = require('mongoose')

const colorSchema = new mongoose.Schema({
  color: {
    type: String,
    unique: true,
  },

  colorCode: {
    type: String,
    unique: true,
  },
})

const Color = mongoose.model('Color', colorSchema)

module.exports = Color
