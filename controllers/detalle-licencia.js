const { request, response } = require("express");
const DetalleLicencia = require("../models/detalle-licencia");
const TipoLicencia = require("../models/tipo-licencia");

const mostrarDetalleLicencia = async (req=request, res=response)=>{
    try {
        const {estado} = req.query;
        const resp = await DetalleLicencia.findAll({
            where:{
            estado,
            },
            include:[
                {
                    model:TipoLicencia
                }
            ]
        });
        res.json({
            ok:true,
            msg:"Se muestran los datos correctamente",
            resp,
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg: `Error: ${error}`,
        })
    }
}

const mostrarIdDetalleLicencia = async(req=request, res=response)=>{
    try {
        const {id} = req.params;
        const resp = await DetalleLicencia.findOne({
            where:{
                id,
            }
        });
        res.json({
            ok:true,
            msg:"Se muestra el detalle licencia con extio",
            resp,
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`,
        });
    }
}

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

const agregarDetalleLicencia = async (req=request, res=response)=>{
    try {
        const {nombre, ...data} = req.body;
        data.nombre = nombre.toUpperCase();
        const resp = await DetalleLicencia.create(data);
        res.json({
            ok:true,
            msg: "Datos ingresados correctamente",
            resp,
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`,
        });
    }
}

const editarDetalleLicencia = async(req=request, res=response)=>{
try {
    const {id} = req.params;
    const {nombre, ...data} = req.body;
    data.nombre = nombre.toUpperCase();
    const resp = await DetalleLicencia.update(data, {
        where:{
            id,
        }
    });
    res.json({
        ok:true,
        msg: "Se actualizo con exito",
        resp,
    })
} catch (error) {
    res.status(400).json({
        ok: false,
        msg:`Error: ${error}`,
    })
}
}

const eliminarDetalleLicencia = ()=>{}

module.exports = {
    mostrarDetalleLicenciaTipo,
    mostrarIdDetalleLicencia,
    mostrarDetalleLicencia,
    agregarDetalleLicencia,
    editarDetalleLicencia,
    eliminarDetalleLicencia

}