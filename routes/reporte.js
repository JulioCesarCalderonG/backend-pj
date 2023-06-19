const { Router } = require("express");
const { postRecordLaboral, mostrarReporteRecordLaboral, postRecordLaboralPersona, postLicenciaPersona, mostrarLicenciaLaboral, postMeritoPersona, mostrarMerito } = require("../controllers/reporte");



const router = Router();


router.post('/recordlaboral',postRecordLaboral);
router.post('/recordlaboral/personal/:id',postRecordLaboralPersona);
router.post('/licencia/personal/:id',postLicenciaPersona);
router.post('/merito/personal/:id',postMeritoPersona);
router.get('/recordlaboral/:nombre',mostrarReporteRecordLaboral);
router.get('/licencia/:nombre',mostrarLicenciaLaboral);
router.get('/merito/:nombre',mostrarMerito);
module.exports = router;