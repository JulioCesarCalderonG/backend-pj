const {Router} = require('express');
const { mostrarGeneral, agregarGeneral, modificarGeneral, eliminarGeneral, mostrarIdGeneral, mostrarGeneralPersonal, mostrarGeneralPersonalEscalafon } = require('../controllers/general');
const { validarCampos, validarArchivoSubir, validarArchivoSubirDos, validarJWT } = require('../middlewares');


const router = Router();

router.get("",mostrarGeneral);

router.get("/personal/:id",mostrarGeneralPersonal);
router.get("/personal/escalafon/:escalafon",mostrarGeneralPersonalEscalafon);

router.get("/:id",mostrarIdGeneral);

router.post("",[
    validarJWT,
    validarArchivoSubirDos,
    validarCampos
],agregarGeneral);

router.put("/:id",[
    validarJWT,
    validarCampos
],modificarGeneral);

router.delete("/:id",eliminarGeneral);

module.exports = router;

