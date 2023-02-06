const mongoose = require('mongoose');

//this will create a database called product if one doesnt already exist without using the shell
mongoose.connect("mongodb://127.0.0.1:27017/PetShop", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to database!"))
    .catch((err) => console.log("Failed to connect to mongoDB", err));