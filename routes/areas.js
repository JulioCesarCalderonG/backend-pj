const { Router } = require("express");
const { mostrarAreas, agregarArea, modificarArea, eliminarArea } = require("../controllers/areas");


const router = Router();


router.get('',mostrarAreas);
router.post('',agregarArea);
router.put('',modificarArea);
router.delete('',eliminarArea);


module.exports = router;