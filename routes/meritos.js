const { Router } = require("express");
const { mostrarMeritoPersonal, mostrarMeritoId, guardarMerito, actualizarMerito, eliminarMerito } = require("../controllers/meritos");
const { validarCampos, validarArchivoSubir } = require("../middlewares");


const router = Router();


router.get('/personal/:id',mostrarMeritoPersonal);
router.get('/:id',mostrarMeritoId);
router.post('',[
    validarArchivoSubir,
    validarCampos
],guardarMerito);
router.put('/:id',actualizarMerito);
router.delete('/:id',eliminarMerito);

module.exports = router;