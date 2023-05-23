const { Router } = require("express");
const { mostrarAdministradores, agregarAdministradores, modificarAdministradores, eliminarAdministradores } = require("../controllers/administrador");


const router = Router();


router.get('',mostrarAdministradores);
router.post('',agregarAdministradores);
router.put('/:id',modificarAdministradores);
router.delete('',eliminarAdministradores);


module.exports = router;