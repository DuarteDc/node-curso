const mongoose = require('mongoose');

const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN);

        console.log('Base de datos conectada!!!');

    } catch (error) {
        console.log(error)
        throw  Error('Error al conectar la base de datos')
    }

}

module.exports = {
    dbConnection
}