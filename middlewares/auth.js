let jwt = require('jsonwebtoken');
require('dotenv').config();
const labels = require('../labels');

let validate = (req, res, next) => {
    let {lang} = req.query;

    try {
        jwt.verify(req.headers['authorization'], process.env.JWTPASSWORD);
        next();
    } catch (e) {
        res.status(500).json({message: labels[lang || 'pt_BR'].error.default});
    }
};