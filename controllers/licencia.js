const { request, response } = require("express");
const { subirArchivo } = require("../helpers");
const Licencia = require("../models/licencia");
const { Personal } = require("../models");
const DetalleLicencia = require("../models/detalle-licencia");
const TipoLicencia = require("../models/tipo-licencia");



const mostrarLicenciasPersonal = async(req=request,res=response)=>{
    try {
        const {id}=req.params;
        const resp = await Licencia.findAll({
            where:{
                id_personal:id
            },
            order:[
                ['inicio','ASC']
            ],
            include:[
                {
                    model:DetalleLicencia,
                    include:[
                        {
                            model:TipoLicencia
                        }
                    ]
                }
            ]
        })
        res.json({
            ok:true,
            msg:'Se muestran los datos con exito',
            resp
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}


const mostrarLicencias = async (req=request, res=response)=>{}


const guardarLicencias = async(req=request,res=response)=>{
    try {
        const file = req.files;
        const {tipo_documento,area,numero,ano,inicio, fin,...data}=req.body;
        let codigodoc='';
        if (tipo_documento==='1') {
            switch (area) {
                case '1':
                        codigodoc = `PROVEIDO N° ${numero}-${ano}-P-CSJUC/PJ`;
                    break;
                case '2':
                        codigodoc = `PROVEIDO N° ${numero}-${ano}-CRH-UAF-GAD-CSJUC/PJ`;
                    break;
                default:
                    break;
            }
        }
        if (tipo_documento==='2') {
            codigodoc = `RESOLUCIONES ADMINISTRATIVAS N° ${numero}-${ano}-CRH-UAF-GAD-CSJUC/PJ`
        }
        data.codigo_documento = codigodoc;
        data.inicio=inicio;
        data.fin=fin;
        const inicioarr= inicio.split('-');
        const finarr = fin.split('-');
        const fechaInicio= new Date(`${inicioarr[1]}/${inicioarr[2]}/${inicioarr[0]}`);
        const fechaFin= new Date(`${finarr[1]}/${finarr[2]}/${finarr[0]}`);
        const dias = ((fechaFin.getTime()-fechaInicio.getTime())/1000/60/60/24)+1;
        data.dias =dias;
        const documento = await subirArchivo(file,['pdf'],'licencias');
        data.documento = documento;
        const resp = await Licencia.create(data);
        res.json({
            ok:true,
            msg:'Se creo la licencia con exito',
            resp
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}


const modificarLicencias = async (req=request, res=response)=>{
try {
    const {id} = req.params;
    const {tipo_documento,area,numero,ano,inicio, fin, ...data} = req.body;
    const resp = await Licencia.update(data, {
        where:{
            id,
        }
    });
    res.json({
        ok:true,
        msg: "Se actualizo los datos con exito",
        resp,
    })
} catch (error) {
    res.status(400).json({
        ok:false,
        msg:`Error: ${error}`,
    })
}
}

const mostrarIdLicencias = async(req=request, res=response)=>{
try {
    const {id} = req.params;
    const resp = await Licencia.findOne({
        where:{
            id,
        },
    });
    res.json({
        ok:true,
        msg:"Se muestra los datos correctamente",
        resp,
    })
} catch (error) {
    res.status(400).json({
        ok:false,
        msg:`Error:${error}`,
    });
}
};

const eliminarLicencias = (req=request, res=response)=>{

}


module.exports = {
    mostrarLicenciasPersonal,
    guardarLicencias,
    mostrarLicencias,
    modificarLicencias,
    mostrarIdLicencias,
    eliminarLicencias
}