const {Router} = require('express');
const { mostrarGeneral, agregarGeneral, modificarGeneral, eliminarGeneral } = require('../controllers/general');


const router = Router();

router.get("",mostrarGeneral);
router.post("",agregarGeneral);
router.put("/:id",modificarGeneral);
router.delete("",eliminarGeneral);

module.exports = router;

