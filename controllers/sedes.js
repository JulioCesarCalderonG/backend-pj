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
const mostrarSede = (req = request, res = response) => {
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

const modificarSede = (req = request, res = response) => {
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
  mostrarSede,
  agregarSede,
  modificarSede,
  eliminarSede,
};
