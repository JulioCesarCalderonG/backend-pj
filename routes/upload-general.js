const { Router } = require("express");
const { mostrarPdfRecordLaboral, mostrarPdfLicencia, mostrarPdfVacacional, putPdfVacacional } = require("../controllers/upload-general");
const { validarCampos, validarArchivoSubir } = require("../middlewares");



const router = Router();

router.get('/recordlaboral/:nombre',mostrarPdfRecordLaboral);
router.get('/licencia/:nombre',mostrarPdfLicencia);
router.get('/vacacional/:nombre',mostrarPdfVacacional);
router.put('/vacacional/:id',[
    validarArchivoSubir,
    validarCampos
],putPdfVacacional);

module.exports = router;