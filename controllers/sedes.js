const { request, response } = require('express');
const { Sede } = require('../models');

const mostrarSedes = async(req = request, res = response) => {
  try {
    const resp = await Sede.findAll();
    res.json({
      ok: true,
      msg:'Se muestran los datos con exitos',
      resp
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};


const mostrarIdSede = async(req = request, res = response) => {
  try {
    const { id } = req.params;

    const resp = await Sede.findOne({
      where: {
        id,
      },
    });
    res.json({
      ok: true,
      msg: "Id se muestran los datos correctamente",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};


const agregarSede = async(req = request, res = response) => {
  try {
    const { nombre, ...data } = req.body;
    data.nombre = nombre.toUpperCase();

    const resp = await Sede.create(data);

    res.json({
      ok: true,
      msg:'Datos ingresados correctamente',
      resp
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};


const modificarSede = async (req = request, res = response) => {
  try {
    const {id} = req.params;
    const {nombre, ...data} = req.body;
    data.nombre= nombre.toUpperCase();

    const resp = await Sede.update(data,{
      where:{
        id
      }
    } );

    res.json({
      ok: true,
      ms:'Se actulizo los datos con exito',
      resp
    });

  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};


const eliminarSede = (req = request, res = response) => {
  try {
    res.json({
      ok: true,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};


module.exports = {
  mostrarSedes,
  mostrarIdSede,
  agregarSede,
  modificarSede,
  eliminarSede,
};
