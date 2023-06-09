const { Router } = require("express");
const { guardarLicencias, mostrarLicenciasPersonal } = require("../controllers/licencia");
const { validarCampos, validarArchivoSubir } = require("../middlewares");


const router = Router();

router.get('/personal/:id',mostrarLicenciasPersonal);
router.post('',[
    validarArchivoSubir,
    validarCampos
],guardarLicencias);


module.exports = router;
