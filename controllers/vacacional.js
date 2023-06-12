const { request, response } = require("express");
const { subirArchivo } = require("../helpers");
const { Vacacional } = require("../models");



const mostrarVacacionalPersonal =async(req=request,res=response)=>{
    try {
        const {id}= req.params;
        const resp = await Vacacional.findAll({
            where:{
                id_personal:id
            },
            order:[
                ['periodo','ASC'],
                ['inicio','ASC']
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

const guardarVacacional =async(req=request,res=response)=>{
    try {
        const file = req.files;
        const {tipo_documento,area,numero,ano,inicio, fin,...data}=req.body;
        let codigodoc = '';
        if (tipo_documento==='1') {
            switch (area) {
                case '1':
                        codigodoc = `R.A N° ${numero}-${ano}-P-CSJUC/PJ`;
                    break;
                case '2':
                        codigodoc = `R.A N° ${numero}-${ano}-GAD-CSJUC/PJ`;
                    break;
                default:
                    break;
            }
        }
        if (tipo_documento==='2') {
            switch (area) {
                case '1':
                        codigodoc = `MEMORANDUM N° ${numero}-${ano}-GAD-CSJUC/PJ`;
                    break;
                case '2':
                        codigodoc = `MEMORANDUM N° ${numero}-${ano}-UAF-GAD-CSJUC/PJ`;
                    break;
                case '3':
                        codigodoc = `MEMORANDUM N° ${numero}-${ano}-OA-CSJUC/PJ`;
                    break;
                default:
                    break;
            }
        }
        data.codigo_documento = codigodoc;
        data.inicio=inicio;
        data.termino=fin;
        const inicioarr= inicio.split('-');
        const finarr = fin.split('-');
        const fechaInicio= new Date(`${inicioarr[1]}/${inicioarr[2]}/${inicioarr[0]}`);
        const fechaFin= new Date(`${finarr[1]}/${finarr[2]}/${finarr[0]}`);
        const dias = ((fechaFin.getTime()-fechaInicio.getTime())/1000/60/60/24)+1;
        const documento = await subirArchivo(file,['pdf'],'vacacional');
        data.documento = documento;
        data.dias =dias;
        const resp = await Vacacional.create(data);
        res.json({
            ok:true,
            msg:'Se creo record vacacional con exito',
            resp
        })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}



module.exports = {
    mostrarVacacionalPersonal,
    guardarVacacional
}