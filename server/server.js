const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // This allows JSON Objects in our post method
app.use(express.urlencoded({ extended: true})); //Allows JSON Objects as Strings and Arrays

require('./config/mongoose.config'); //starts our server
require('./routes/pet.route')(app); //importing the exported routes so that we can use them in the server

app.listen(8000, () => console.log(`Listening on Port: 8000`));