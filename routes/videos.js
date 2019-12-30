let models = require('../models/videos');
const fileUpload = require('express-fileupload');

module.exports = (app) => {

    app.use(fileUpload());
    app.post('/videos/', models.create);
    app.get('/videos/:id', models.get);
    app.put('/videos/:id', models.update);
    app.delete('/videos/:id', models.delete);

};