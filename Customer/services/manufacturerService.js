const Manufacturer = require('../models/manufacturer')

const manufacturerService = {
  getAllManufacturers() {
    const manufacturers = Manufacturer.find()
    return manufacturers
  },

  findManufacturerByName(name) {
    const manufacturer = Manufacturer.findOne({ name: name })
    return manufacturer
  },
}

module.exports = manufacturerService
