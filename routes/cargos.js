const { Router } = require("express");
const { mostrarCargos, agregarCargo, modificarCargo, eliminarCargo } = require("../controllers/cargos");


const router = Router();

router.get('',mostrarCargos);
router.post('',agregarCargo);
router.put('',modificarCargo);
router.delete('',eliminarCargo);



module.exports = router;