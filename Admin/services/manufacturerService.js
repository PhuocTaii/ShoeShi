const Manufacturer = require('../models/manufacturer')

const manufacturerService = {
  getAllManufacturers() {
    const manufacturers = Manufacturer.find().lean()
    return manufacturers
  },

  addManufacturer(manufacturer) {
    const newManufacturer = new Manufacturer(manufacturer)
    const savedManufacturer = newManufacturer.save()
    return savedManufacturer
  },

  deleteManufacturer(id) {
    const manufacturers = Manufacturer.findByIdAndDelete(id)
    return manufacturers
  },

  findManufacturerByName(name) {
    const manufacturer = Manufacturer.findOne({ name: name })
    return manufacturer
  },

  updateManufacturer(id, manufacturer) {
    const updatedManufacturer = Manufacturer.findByIdAndUpdate(
      id,
      manufacturer,
    )
    return updatedManufacturer
  },
}

module.exports = manufacturerService
