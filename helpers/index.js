const dbValidators = require("./db-validators");
const generarJWT = require("./generar-jwt");
const subirArchivo = require("./subir-archivo");
const Option = require('./option');
module.exports = {
  ...dbValidators,
  ...generarJWT,
  ...subirArchivo,
  ...Option
};
