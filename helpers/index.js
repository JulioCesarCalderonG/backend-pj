const dbValidators = require("./db-validators");
const generarJWT = require("./generar-jwt");
const subirArchivo = require("./subir-archivo");
const Option = require('./option');
const FunFecha = require('./fc-fecha');
module.exports = {
  ...dbValidators,
  ...generarJWT,
  ...subirArchivo,
  ...Option,
  ...FunFecha
};
