const Pet = require("../models/pet.model");

//creates new pet in database
module.exports.createPet = (req, res) => {
    Pet.create(req.body)
    .then(pet => res.json(pet))
    .catch(err => res.status(400).json(err));
}

//gets all of the pets from the databse
module.exports.getAllPets = (req,res) => {
    Pet.find({})
    .then(pets => {
        console.log(pets);
        res.json(pets);
    })
    .catch(err => res.status(400).json(err));
}

//finds a singular pet by id
module.exports.getPet = (req,res) => {
    Pet.findOne({_id:req.params.id})
    .then(pet => res.json(pet))
    .catch(err => res.status(400).json(err));
}

//updates a pet in databse by id
module.exports.updatePet = (req, res) => {
    Pet.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators: true})
    .then(updatedPet => res.json(updatedPet))
    .catch(err => res.status(400).json(err));
}

//deletes a pet by its id
module.exports.deletePet = (req, res) => {
    Pet.deleteOne({_id:req.params.id})
    .then(deletedPet => res.json(deletedPet))
    .catch(err => res.status(400).json(err));
}
