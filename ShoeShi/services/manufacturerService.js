const Manufacturer = require('../models/manufacturer')

const manufacturerService = {
    getAllManufacturers(){
        const manufacturers = Manufacturer.find()
        return manufacturers
    },

    addManufacturer(color){
        const newManufacturer = new Manufacturer(color)
        const savedManufacturer = newManufacturer.save()
        return savedManufacturer
    },

    deleteManufacturer(id){
        const manufacturers = Manufacturer.findByIdAndDelete(id)
        return manufacturers
    },
}

module.exports = manufacturerService