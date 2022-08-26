const {Schema, model} = require('mongoose');

const RoleSchema = Schema({
    rol: {
        type: String,
        require: true,
    }
});

module.exports = model('Role', RoleSchema);