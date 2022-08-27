const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../DB/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.connectDB();

        this.middlewares();
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    routes() {
        this.app.use('/api/users', require('../routes/User'));
        this.app.use('/api/auth', require('../routes/Auth'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server in port ${this.port}`)
        });
    }

}

module.exports = Server;