const {Router} = require('express');
const { mostrarGeneral, agregarGeneral, modificarGeneral, eliminarGeneral, mostrarIdGeneral, mostrarGeneralPersonal } = require('../controllers/general');
const { validarCampos, validarArchivoSubir, validarArchivoSubirDos } = require('../middlewares');


const router = Router();

router.get("",mostrarGeneral);

router.get("/personal/:id",mostrarGeneralPersonal);

router.get("/:id",mostrarIdGeneral);

router.post("",[
    validarArchivoSubirDos,
    validarCampos
],agregarGeneral);

router.put("/:id",modificarGeneral);

router.delete("/:id",eliminarGeneral);

module.exports = router;

