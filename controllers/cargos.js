const { request, response } = require("express");
const { Cargo } = require("../models");

const mostrarCargos = async (req = request, res = response) => {
  const resp = await Cargo.findAll();
  res.json({
    ok: true,
    msg: "Se muestran los datos correctamente",
    resp,
  });
};

const agregarCargo = async (req = request, res = response) => {
  try {
    const { descripcion, ...data } = req.body;
    data.descripcion = descripcion.toUpperCase();

    const resp = await Cargo.create(data);

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

const modificarCargo = async (req = request, res = response) => {
  try {
    const { descripcion, ...data } = req.body;
    const { id } = req.params;
    data.descripcion = descripcion.toUpperCase();

    const resp = await Cargo.update(data, {
      where: {
        id,
      },
    });

    res.json({
      ok: true,
      msg: "Cargo actualizado con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};

const mostrarIdCargo = async (req = request, res = response) => {
  try {
   const { id } = req.params;
 
   const resp = await Cargo.findOne({
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

const eliminarCargo = (req = request, res = response) => {};

module.exports = {
  mostrarCargos,
  agregarCargo,
  modificarCargo,
  eliminarCargo,
  mostrarIdCargo
};
