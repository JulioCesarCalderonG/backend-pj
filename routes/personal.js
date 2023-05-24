const { Router } = require("express");
const { mostrarPersonales, agregarPersonal, modificarPersonal, eliminarPersonal, mostrarIdPersonal } = require("../controllers/personal");
const { validarCampos } = require("../middlewares/validar-campos");
const { check } = require("express-validator");
const { validarEscalafonPersonal, validarNombrePersonal, validarApellidoPersonal } = require("../helpers/db-validators");


const router = Router();

router.get("", mostrarPersonales);

router.get("/:id",mostrarIdPersonal);

router.post("",[
    check('nombre').custom(validarNombrePersonal),
    check('apellido').custom(validarApellidoPersonal),
    check('escalafon').custom(validarEscalafonPersonal),
    validarCampos
],agregarPersonal);

router.put("/:id",modificarPersonal);

router.delete("",eliminarPersonal);


module.exports = router;