const { Router } = require("express");
const { mostrarPdfRecordLaboral, mostrarPdfLicencia, mostrarPdfVacacional, putPdfVacacional, putPdfLaboral, putPdfLicencia } = require("../controllers/upload-general");
const { validarCampos, validarArchivoSubir } = require("../middlewares");



const router = Router();

router.get('/recordlaboral/:nombre',mostrarPdfRecordLaboral);
router.get('/licencia/:nombre',mostrarPdfLicencia);
router.get('/vacacional/:nombre',mostrarPdfVacacional);
router.put('/vacacional/:id',[
    validarArchivoSubir,
    validarCampos
],putPdfVacacional);
router.put('/recordlaboral/:id',[
    validarCampos,
    validarArchivoSubir
], putPdfLaboral);
router.put('/licencia/:id', [
    validarCampos,
    validarArchivoSubir
],putPdfLicencia);

module.exports = router;