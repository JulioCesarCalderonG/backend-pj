const { request, response } = require("express");
const { Personal } = require("../models");

const mostrarPersonales = async (req = request, res = response) => {
  try {
    const {estado} = req.query;
    const resp = await Personal.findAll({
      where:{
        estado
      }
    });
  res.json({
    ok: true,
    msg: "Se muestran correctamento los datos",
    resp,
  });
  } catch (error) {
    res.status(400).json({
      ok:false,
      msg:`Error: ${error}`,
    });
  }
};


const mostrarIdPersonal = async (req = request, res = response) => {
  try {
   const { id } = req.params;
 
   const resp = await Personal.findOne({
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


const agregarPersonal = async (req = request, res = response) => {
  try {
    const { nombre, apellido, escalafon, ...data } = req.body;
    data.nombre = nombre.toUpperCase();
    data.apellido = apellido.toUpperCase();
    data.escalafon = escalafon;

    const resp = await Personal.create(data);

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


const modificarPersonal = async (req = request, res = response) => {
  try {
    const { nombre, apellido, escalafon, fechainicio, ...data } = req.body;
    const { id } = req.params;
    data.nombre = nombre.toUpperCase();
    data.apellido = apellido.toUpperCase();
    data.escalafon = escalafon.toUpperCase();
    data.fecha_inicio = fechainicio.toUpperCase();

    const resp = await Personal.update(data, {
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


const eliminarPersonal = async (req = request, res = response) => {
  try {
    const {id} = req.params;
    const {estado} = req.query;
    const data={
      estado,
    };
    const resp = await Personal.update(data,{
      where:{
        id
      }
    });
    res.json({
      ok: true,
      msg:
      (estado === '1')?"Se habilito el personal con exito":"Se deshabilito el personal con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

module.exports = {
  mostrarPersonales,
  mostrarIdPersonal,
  agregarPersonal,
  modificarPersonal,
  eliminarPersonal,
};
