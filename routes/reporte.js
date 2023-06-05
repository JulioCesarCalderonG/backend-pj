const { Router } = require("express");
const { postRecordLaboral } = require("../controllers/reporte");



const router = Router();


router.post('/recordlaboral',postRecordLaboral);


module.exports = router;