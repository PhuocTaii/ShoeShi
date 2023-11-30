const Manufacturer = require('../models/manufacturer')

const manufacturerService = {
    getAllManufacturers(){
        const manufacturers = Manufacturer.find()
        return manufacturers
    },

    addManufacturer(manufacturer){
        const newManufacturer = new Manufacturer(manufacturer)
        const savedManufacturer = newManufacturer.save()
        return savedManufacturer
    },

    deleteManufacturer(id){
        const manufacturers = Manufacturer.findByIdAndDelete(id)
        return manufacturers
    },
    
    findManufacturerByName(name){
        const manufacturers = Manufacturer.findOne({name: name})
        return manufacturers
    }
}

module.exports = manufacturerService