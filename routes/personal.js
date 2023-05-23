const { Router } = require("express");
const { mostrarPersonales, agregarPersonal, modificarPersonal, eliminarPersonal } = require("../controllers/personal");




const router = Router();


router.get("", mostrarPersonales);
router.post("",agregarPersonal);
router.put("/:id",modificarPersonal);
router.delete("",eliminarPersonal);


module.exports = router;