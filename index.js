//Utilitarios
require('dotenv').config();

//Core
const bodyParser = require('body-parser');
const express = require('express');
let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require('mongoose');

//Mongo
mongoose.connect('mongodb://localhost:27017/playex', {useNewUrlParser: true});



//Rotas
require('./routes/users')(app);
require('./routes/videos')(app);
require('./routes/login')(app);
require('./routes/playlists')(app);

//Listen
app.listen(process.env.PORT, function() {
    console.log('Servidor iniciado na porta ' + process.env.PORT);
});