const { Router } = require("express");
const { mostrarPdfRecordLaboral, mostrarPdfLicencia } = require("../controllers/upload-general");



const router = Router();

router.get('/recordlaboral/:nombre',mostrarPdfRecordLaboral);
router.get('/licencia/:nombre',mostrarPdfLicencia);


module.exports = router;