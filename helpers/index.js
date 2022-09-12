
const dbValidator = require('./dbValidator');
const generateJWT = require('./generateJWT');
const uploadFiles = require('./uploadFiles');
const validateGoogleToken = require('./validateGoogleToken');

module.exports = {
    ...dbValidator,
    ...generateJWT,
    ...uploadFiles,
    ...validateGoogleToken,
}
