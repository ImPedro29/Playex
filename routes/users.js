let models = require('../models/users');

module.exports = (app) => {

    app.post('/users/', models.create);
    app.get('/users/:id', models.get);
    app.put('/users/:id', models.update);
    app.delete('/users/:id', models.delete);

};