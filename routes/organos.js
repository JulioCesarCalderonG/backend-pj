const { Router } = require("express");
const { mostrarOrganos, mostrarOrgano, agregarOrgano, modificarOrgano, eliminarOrgano } = require("../controllers/organos");



const router = Router();

router.get('',mostrarOrganos);
router.get('/:id',mostrarOrgano);
router.post('',agregarOrgano);
router.put('/:id',modificarOrgano);
router.delete('/:id',eliminarOrgano);


module.exports = router;