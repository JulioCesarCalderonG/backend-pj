const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/database');
const http = require('http');
const socketIO = require('socket.io');
const sequelize = require('../database/database');
const { conectarCliente } = require('../sockets/usuario-socket');
class Server {
  static _intance = Server;
  io = socketIO.Server;
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      /* auth: '/api/auth',
            usuario: '/api/usuario',
            uploads: '/api/uploads' */
            personal: '/api/personal',
            area: '/api/area',
            cargo: '/api/cargo',
            dependencia: '/api/dependencia',
            tipodocumento: '/api/tipodocumento',
            administrador: '/api/administrador',
            general: '/api/general',
            sede:'/api/sede',
            organo:'/api/organo',
            unidadorganica:'/api/unidadorganica',
            tipopersonal:'/api/tipopersonal',
            uploadgeneral:'/api/uploadgeneral',
            reporte:'/api/reporte'
    };
    //Connect to socket
    this.httpServer = new http.Server(this.app);
    this.io = require('socket.io')(this.httpServer, {
      cors: {
        origin: true,
        credentials: true,
      },
    });
    // Connect to database
    this.connectDB();
    //  listen Sockets
    this.listenSockets();
    // Middlewares
    this.middlewares();
    // Routes application
    this.routes();
  }
  static get instance() {
    return this._intance || (this._intance = new this());
  }
  async connectDB() {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  listenSockets() {
    console.log('Escuchando conexiones - sockets');
    this.io.on('connection', (cliente) => {
      console.log('Cliente conectado');
      conectarCliente(cliente, this.io);
    });
  }
  middlewares() {
    // Fileupload - Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true,
      })
    );
    // Cors
    this.app.use(cors());
    // Lectura y parseo del body
    this.app.use(express.json());
    // Directorio publico
    this.app.use(express.static('public'));
  }
  routes() {
    /* this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.usuario, require('../routes/usuarios'));
    this.app.use(this.paths.uploads, require('../routes/uploads')); */
    this.app.use(this.paths.personal, require('../routes/personal'));
    this.app.use(this.paths.area, require('../routes/areas'));
    this.app.use(this.paths.cargo, require('../routes/cargos'));
    this.app.use(this.paths.dependencia, require('../routes/dependencias'));
    this.app.use(this.paths.tipodocumento, require('../routes/tipodocumento'));
    this.app.use(this.paths.administrador, require('../routes/administrador'));
    this.app.use(this.paths.general, require('../routes/general'));
    this.app.use(this.paths.sede, require('../routes/sede'));
    this.app.use(this.paths.organo, require('../routes/organos'));
    this.app.use(this.paths.unidadorganica, require('../routes/unidadorganicas'));
    this.app.use(this.paths.tipopersonal, require('../routes/tipo_personal'));
    this.app.use(this.paths.uploadgeneral, require('../routes/upload-general'));
    this.app.use(this.paths.reporte, require('../routes/reporte'));
  }
  listen() {
    this.httpServer.listen(this.port, () => {
      console.log(
        `Escuchando el puerto ${this.port}: http://localhost:${this.port}`
      );
    });
  }
}

module.exports = Server;
