const { Router } = require("express");
const { mostrarSedes, mostrarSede, agregarSede, modificarSede, eliminarSede } = require("../controllers/sedes");
const { validarCampos } = require("../middlewares");
const { check } = require("express-validator");
const { validarNombreSede } = require("../helpers");




const router = Router();


router.get('',mostrarSedes);
router.get('/:id',mostrarSede);
router.post('',[
    check('nombre').custom(validarNombreSede),
    validarCampos
],agregarSede);
router.put('/:id',modificarSede);
router.delete('/:id',eliminarSede);



module.exports = router;