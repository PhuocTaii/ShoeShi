const mongoose = require('mongoose')

const colorSchema = new mongoose.Schema({
  color: {
    type: String,
  },

  colorCode: {
    type: String,
  },
})

const Color = mongoose.model('Color', colorSchema)

module.exports = Color