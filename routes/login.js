let login = require('../models/login');

module.exports = (app) => {

    app.post('/login', login);

};