const { Router } = require("express");
const { mostrarPdfRecordLaboral } = require("../controllers/upload-general");



const router = Router();

router.get('/recordlaboral/:nombre',mostrarPdfRecordLaboral);



module.exports = router;