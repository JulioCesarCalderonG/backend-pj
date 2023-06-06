const { Router } = require("express");
const { postRecordLaboral, mostrarReporteRecordLaboral } = require("../controllers/reporte");



const router = Router();


router.post('/recordlaboral',postRecordLaboral);
router.get('/recordlaboral/:nombre',mostrarReporteRecordLaboral)

module.exports = router;