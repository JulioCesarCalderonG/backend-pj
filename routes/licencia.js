const { Router } = require("express");
const { guardarLicencias, mostrarLicenciasPersonal, modificarLicencias, eliminarLicencias, mostrarLicencias, mostrarIdLicencias } = require("../controllers/licencia");
const { validarCampos, validarArchivoSubir } = require("../middlewares");


const router = Router();
router.get('',mostrarLicencias);
router.get('',mostrarIdLicencias);
router.get('/personal/:id',mostrarLicenciasPersonal);
router.post('',[
    validarArchivoSubir,
    validarCampos
],guardarLicencias);
router.put('',modificarLicencias);
router.delete('',eliminarLicencias);


module.exports = router;
