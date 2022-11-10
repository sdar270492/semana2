const User = require('../models/user.model');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');

module.exports.create = (req, res, next) => {
    User.create(req.body)
        .then((user) => {
            res.json(user);
        })
        .catch(next);
};

module.exports.login = (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({email})
        .then((user) => {
            if(user){
                user.checkPassword(password)
                    .then(match => {
                        if(match){
                            const token = jwt.sign(
                                { sub: user.id, exp: Date.now() / 1000 + 3600 },
                                "*key secret token*"
                            );

                            res.json( {token} );
                        } else {
                            next(createError(401, 'Wrong credentials'));
                        }
                    });

            } else {
                next(createError(400, 'User not found'));
            }
        })
        .catch(next);
}