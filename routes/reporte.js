const { Router } = require("express");
const { postRecordLaboral, mostrarReporteRecordLaboral, postRecordLaboralPersona, postLicenciaPersona, mostrarLicenciaLaboral } = require("../controllers/reporte");



const router = Router();


router.post('/recordlaboral',postRecordLaboral);
router.post('/recordlaboral/personal/:id',postRecordLaboralPersona);
router.post('/licencia/personal/:id',postLicenciaPersona);
router.get('/recordlaboral/:nombre',mostrarReporteRecordLaboral);
router.get('/licencia/:nombre',mostrarLicenciaLaboral);

module.exports = router;