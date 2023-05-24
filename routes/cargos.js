const { Router } = require("express");
const { mostrarCargos, agregarCargo, modificarCargo, eliminarCargo, mostrarIdCargo } = require("../controllers/cargos");
const { validarCampos } = require("../middlewares/validar-campos");
const { check } = require("express-validator");
const { validarDescripcionCargo } = require("../helpers/db-validators");


const router = Router();

router.get("",mostrarCargos);

router.get("/:id",mostrarIdCargo);

router.post("",[
    check('descripcion').custom(validarDescripcionCargo),
    validarCampos
],agregarCargo);

router.put("/:id",modificarCargo);

router.delete("",eliminarCargo);



module.exports = router;