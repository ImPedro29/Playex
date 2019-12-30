const bcrypt = require('bcrypt');
const labels = require('../labels');
let User = require('./schemas/users');
let jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    let {email, password} = req.body;
    let {lang} = req.query;

    User.findOne({email}, (err, obj) => {
        if (err) res.status(500).json({message: labels[lang || 'pt_BR'].error.default});

        bcrypt.compare(password, obj.password).then(function (response) {
            if (response) {
                jwt.sign({
                    email,
                    password
                }, process.env.JWTPASSWORD, {expiresIn: 60 * 60 * 24 * 30}, function (err, token) {
                    res.setHeader('token', token);
                    res.status(200).json({message: labels[lang || 'pt_BR'].logInSuccess});
                });
            } else
                res.status(500).json({message: labels[lang || 'pt_BR'].error.default});

        });
    });


};