const { Router } = require("express");
const { guardarLicencias, mostrarLicenciasPersonal, modificarLicencias, eliminarLicencias, mostrarLicencias, mostrarIdLicencias } = require("../controllers/licencia");
const { validarCampos, validarArchivoSubir } = require("../middlewares");


const router = Router();
router.get('',mostrarLicencias);
router.get('/:id',mostrarIdLicencias);
router.get('/personal/:id',mostrarLicenciasPersonal);
router.post('',[
    validarArchivoSubir,
    validarCampos
],guardarLicencias);
router.put('/:id',modificarLicencias);
router.delete('/:id',eliminarLicencias);


module.exports = router;
