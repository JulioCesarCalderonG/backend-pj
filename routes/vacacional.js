const { Router } = require("express");
const { mostrarVacacionalPersonal, guardarVacacional } = require("../controllers/vacacional");
const { validarCampos, validarArchivoSubir } = require("../middlewares");



const router =  Router();



router.get('/personal/:id',mostrarVacacionalPersonal);
router.post('',[
    validarArchivoSubir,
    validarCampos
],guardarVacacional);



module.exports = router;