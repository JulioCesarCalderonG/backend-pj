const {Router} = require('express');
const { mostrarGeneral, agregarGeneral, modificarGeneral, eliminarGeneral, mostrarIdGeneral } = require('../controllers/general');
const { validarCampos, validarArchivoSubir } = require('../middlewares');


const router = Router();

router.get("",mostrarGeneral);

router.get("/:id",mostrarIdGeneral);

router.post("",[
    validarArchivoSubir,
    validarCampos
],agregarGeneral);

router.put("/:id",modificarGeneral);

router.delete("",eliminarGeneral);

module.exports = router;

