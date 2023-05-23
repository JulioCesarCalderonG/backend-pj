const { Router } = require("express");
const { mostrarTipodocumento, agregarTipodocumento, modificarTipodocumento, eliminarTipodocumento } = require("../controllers/tipodocumento");


const router = Router();

router.get('',mostrarTipodocumento);
router.post('',agregarTipodocumento);
router.put('/:id',modificarTipodocumento);
router.delete('',eliminarTipodocumento);



module.exports = router;