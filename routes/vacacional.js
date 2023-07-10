const { Router } = require("express");
const { mostrarVacacionalPersonal, guardarVacacional, mostrarVacacional, mostrarIdVacacional, editarVacacional, eliminarVacacional } = require("../controllers/vacacional");
const { validarCampos, validarArchivoSubir, validarJWT } = require("../middlewares");



const router =  Router();
router.get('', mostrarVacacional);
router.get('/:id', mostrarIdVacacional);
router.get('/personal/:id',mostrarVacacionalPersonal);
router.post('',[
    validarJWT,
    validarArchivoSubir,
    validarCampos
],guardarVacacional);
router.put('/:id',[
    validarJWT,
    validarCampos
], editarVacacional);
router.delete('/:id',[
    validarJWT,
    validarCampos
], eliminarVacacional);


module.exports = router;