const { Router } = require("express");
const { mostrarIdHistorial, mostrarHistorial } = require("../controllers/historial");


const router = Router();

router.get('/administrador/:id', mostrarHistorial);
router.get('/:id', mostrarIdHistorial);
router.post('');
router.put('');
router.delete('');

module.exports = router;