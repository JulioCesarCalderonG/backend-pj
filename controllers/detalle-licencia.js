const { request, response } = require("express");
const DetalleLicencia = require("../models/detalle-licencia");
const TipoLicencia = require("../models/tipo-licencia");


const mostrarDetalleLicenciaTipo =async(req=request,res=response)=>{
    try {
        const {id} =req.params;
        const resp = await DetalleLicencia.findAll({
            where:{
                id_tipo_licencia:id,
                estado:1
            }
        })
        res.json({
            ok:true,
            resp
        })
    } catch (error) {
        res.status(400).json({
            ok:true,
            msg:`Error: ${error}`
        })
    }
}


module.exports = {
    mostrarDetalleLicenciaTipo
}