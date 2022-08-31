const jwt = require('jsonwebtoken');

const generateJWT = (_id = '') => {

    return new Promise((resolve, reject) => {

        const payload = { _id };

        jwt.sign(payload, process.env.SECRET_JWT_KEY, {
            expiresIn: '7d'
        }, (error, token) => {
            if (error) {
                console.log(error);
                return reject('Error to generate JWT');
            }
            resolve(token);
        });

    });

}

module.exports = {
    generateJWT,
}