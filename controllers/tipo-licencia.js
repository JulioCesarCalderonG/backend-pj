const { request, response } = require("express");
const TipoLicencia = require("../models/tipo-licencia");


const mostrarTipoLicencia =async(req=request,res=response)=>{
    try {
        const {estado}=req.query;
        const resp= await TipoLicencia.findAll({
            where:{
                estado
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
    mostrarTipoLicencia
}