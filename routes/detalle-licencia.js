const { Router } = require("express");
const { mostrarDetalleLicenciaTipo } = require("../controllers/detalle-licencia");


const router = Router();


router.get('/tipo/:id',mostrarDetalleLicenciaTipo);


module.exports = router;