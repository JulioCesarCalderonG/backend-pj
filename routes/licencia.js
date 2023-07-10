const { Router } = require("express");
const { guardarLicencias, mostrarLicenciasPersonal, modificarLicencias, eliminarLicencias, mostrarLicencias, mostrarIdLicencias } = require("../controllers/licencia");
const { validarCampos, validarArchivoSubir, validarJWT } = require("../middlewares");


const router = Router();
router.get('',mostrarLicencias);
router.get('/:id',mostrarIdLicencias);
router.get('/personal/:id',mostrarLicenciasPersonal);
router.post('',[
    validarJWT,
    validarArchivoSubir,
    validarCampos
],guardarLicencias);
router.put('/:id',[
    validarJWT,
    validarCampos
],modificarLicencias);
router.delete('/:id',[
    validarJWT,
    validarCampos
],eliminarLicencias);


module.exports = router;
