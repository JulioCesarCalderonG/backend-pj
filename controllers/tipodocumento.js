const { request, response } = require("express");
const { Tipodocumento } = require("../models");



const mostrarTipodocumento = async(req=request, res=response)=>{
    const resp = await Tipodocumento.findAll();
  res.json({
    ok: true,
    msg: "Se muestran los datos correctamente",
    resp,
  });
};


const agregarTipodocumento = async(req=request, res=response)=>{
    try {
        const { descripcion, ...data } = req.body;
        data.descripcion = descripcion.toUpperCase();
        
        const resp = await Tipodocumento.create(data);
    
        res.json({
          ok: true,
          msg: "Datos ingresados correctamente",
          resp,
        });

      } catch (error) {
        res.status(400).json({
          ok: false,
          msg: `Error: ${error}`,
        });
      }
};

const modificarTipodocumento = (req=request, res=response)=>{};

const eliminarTipodocumento = (req=request, res=response)=>{};


module.exports = {
    mostrarTipodocumento,
    agregarTipodocumento,
    modificarTipodocumento,
    eliminarTipodocumento
}