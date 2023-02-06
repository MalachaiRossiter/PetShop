const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name: {type: String, required: [true, "name is required"], minLength: [3, "Name must be at least 3 characters"]},
    type: {type: String, required: [true, "Species is required"], minLength: [3, "Species must be at least 3 characters"]},
    description: {type: String, required: [true, "Description is required"], minLength: [3, "Description must be at least 3 characters"]},
    skills: {type: Array},
    likes: {type: Number}
}, {timestamps: true});
module.exports = mongoose.model("Pet", PetSchema)