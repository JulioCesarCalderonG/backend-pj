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

const modificarTipodocumento = async(req=request, res=response)=>{
  try {
    const { descripcion, ...data } = req.body;
    const { id } = req.params;
    data.descripcion = descripcion.toUpperCase();

    const resp = await Tipodocumento.update(data, {
      where: {
        id,
      },
    });

    res.json({
      ok:true,
      msg:'Personal actualizado con exito',
      resp
    });
  } catch (error) {
    res.status(400).json({
      ok:false,
      msg:`Error:${error}`
    })
  }
};

const mostrarIdTipodocumento = async (req = request, res = response) => {
  try {
   const { id } = req.params;
 
   const resp = await Tipodocumento.findOne({
     where:{
       id
     }
   });
   res.json({
     ok: true,
     msg: 'Id se muestran los datos correctamente',
     resp,
   });
  } catch (error) {
   res.status(400).json({
     ok:false,
     msg:`Error:${error}`
   })
  }
 };


const eliminarTipodocumento = (req=request, res=response)=>{};


module.exports = {
    mostrarTipodocumento,
    agregarTipodocumento,
    modificarTipodocumento,
    eliminarTipodocumento,
    mostrarIdTipodocumento,
}