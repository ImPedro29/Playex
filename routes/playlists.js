let models = require('../models/playlists');
const fileUpload = require('express-fileupload');

module.exports = (app) => {

    app.post('/playlists/', models.create);
    app.get('/playlists/:id', models.get);
    app.put('/playlists/:id', models.update);
    app.delete('/playlists/:id', models.delete);

};