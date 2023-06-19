const { Router } = require("express");
const { mostrarPdfRecordLaboral, mostrarPdfLicencia, mostrarPdfVacacional, putPdfVacacional, putPdfLaboral, putPdfLicencia, mostrarPdfMerito, putPdfMerito } = require("../controllers/upload-general");
const { validarCampos, validarArchivoSubir } = require("../middlewares");



const router = Router();

router.get('/recordlaboral/:nombre',mostrarPdfRecordLaboral);
router.get('/licencia/:nombre',mostrarPdfLicencia);
router.get('/vacacional/:nombre',mostrarPdfVacacional);
router.get('/merito/:nombre',mostrarPdfMerito)
router.put('/vacacional/:id',[
    validarArchivoSubir,
    validarCampos
],putPdfVacacional);
router.put('/recordlaboral/:id',[
    validarCampos,
    validarArchivoSubir
], putPdfLaboral);
router.put('/licencias/:id', [
    validarCampos,
    validarArchivoSubir
],putPdfLicencia);
router.put('/merito/:id', [
    validarCampos,
    validarArchivoSubir
],putPdfMerito);

module.exports = router;