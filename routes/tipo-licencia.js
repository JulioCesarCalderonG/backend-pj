const { Router } = require("express");
const { mostrarTipoLicencia } = require("../controllers/tipo-licencia");


const router = Router();


router.get('',mostrarTipoLicencia);


module.exports = router;