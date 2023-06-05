const { request, response } = require("express");
const { General } = require("../models");
const path = require("path");
const fs = require("fs");


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

module.exports = {
    mostrarPdfRecordLaboral
}