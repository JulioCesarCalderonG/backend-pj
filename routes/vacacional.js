const { Router } = require("express");
const { mostrarVacacionalPersonal, guardarVacacional, mostrarVacacional, mostrarIdVacacional, editarVacacional, eliminarVacacional } = require("../controllers/vacacional");
const { validarCampos, validarArchivoSubir } = require("../middlewares");



const router =  Router();
router.get('', mostrarVacacional);
router.get('/:id', mostrarIdVacacional);
router.get('/personal/:id',mostrarVacacionalPersonal);
router.post('',[
    validarArchivoSubir,
    validarCampos
],guardarVacacional);
router.put('/:id', editarVacacional);
router.delete('/:id', eliminarVacacional);


module.exports = router;