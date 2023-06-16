const { request, response } = require("express");
const { General, Vacacional } = require("../models");
const path = require("path");
const fs = require("fs");
const Licencia = require("../models/licencia");
const { subirArchivo } = require("../helpers");


const mostrarPdfRecordLaboral =async(req=request,res=response)=>{
    try {
    const { nombre } = req.params;
    const resp = await General.findOne({
      where: {
        documento:nombre
      },
    });
    if (!resp) {
      const pathImagenDefault = path.join(__dirname, "../assets/no-image.jpg");
      return res.sendFile(pathImagenDefault);
    }
    
    if (resp.documento) {
      const pathImagen = path.join(__dirname,"../uploads","record-laboral",resp.documento);
      return res.sendFile(pathImagen);
    }
      const pathImagenDefault = path.join(__dirname, "../assets/no-image.jpg");
      return res.sendFile(pathImagenDefault); 
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `${error}`,
          }); 
    }
}
const mostrarPdfLicencia =async(req=request,res=response)=>{
  try {
  const { nombre } = req.params;
  const resp = await Licencia.findOne({
    where: {
      documento:nombre
    },
  });
  if (!resp) {
    const pathImagenDefault = path.join(__dirname, "../assets/no-image.jpg");
    return res.sendFile(pathImagenDefault);
  }
  
  if (resp.documento) {
    const pathImagen = path.join(__dirname,"../uploads","licencias",resp.documento);
    return res.sendFile(pathImagen);
  }
    const pathImagenDefault = path.join(__dirname, "../assets/no-image.jpg");
    return res.sendFile(pathImagenDefault); 
  } catch (error) {
      res.status(400).json({
          ok: false,
          msg: `${error}`,
        }); 
  }
}
const mostrarPdfVacacional =async(req=request,res=response)=>{
  try {
  const { nombre } = req.params;
  const resp = await Vacacional.findOne({
    where: {
      documento:nombre
    },
  });
  if (!resp) {
    const pathImagenDefault = path.join(__dirname, "../assets/no-image.jpg");
    return res.sendFile(pathImagenDefault);
  }
  
  if (resp.documento) {
    const pathImagen = path.join(__dirname,"../uploads","vacacional",resp.documento);
    return res.sendFile(pathImagen);
  }
    const pathImagenDefault = path.join(__dirname, "../assets/no-image.jpg");
    return res.sendFile(pathImagenDefault); 
  } catch (error) {
      res.status(400).json({
          ok: false,
          msg: `${error}`,
        }); 
  }
}

const putPdfVacacional =async(req=request,res=response)=>{
  try {
    const {id}= req.params;
    const file= req.files;
    const resp = await Vacacional.findOne({
      where:{
        id
      }
    });
    if (resp.documento) {
      const pathDocumento = path.join(__dirname,'../uploads','vacacional',resp.documento);
      if (fs.existsSync(pathDocumento)) {
        fs.unlinkSync(pathDocumento);
      }
    }
    const documento = await subirArchivo(file,['pdf'],"vacacional");
    const actualizar = await Vacacional.update({
      documento
    },{
      where:{
        id
      }
    })
    res.json({
      ok:true,
      msg:'Se actulizo el archivo con exito',
      resp:actualizar
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    }); 
  }
}
module.exports = {
    mostrarPdfRecordLaboral,
    mostrarPdfLicencia,
    mostrarPdfVacacional,
    putPdfVacacional
}