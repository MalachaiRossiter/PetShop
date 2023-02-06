const PetController = require('../controllers/pet.controller');


module.exports = (app) => {
    app.get('/api/pet', PetController.getAllPets);
    app.get('/api/pet/:id', PetController.getPet);
    app.put('/api/pet/:id', PetController.updatePet);
    app.post('/api/pet', PetController.createPet);
    app.delete('/api/pet/:id', PetController.deletePet);
}