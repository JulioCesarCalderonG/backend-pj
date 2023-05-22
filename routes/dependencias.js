const { Router } = require('express');
const { mostrarDependencias, agregarDependencias, modificarDependencias, eliminarDependencias } = require('../controllers/dependencia');

const router = Router();

router.get("",mostrarDependencias);
router.post("",agregarDependencias);
router.put("",modificarDependencias);
router.delete("",eliminarDependencias);

module.exports = router;