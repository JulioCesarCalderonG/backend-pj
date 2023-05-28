const { request, response } = require("express");
const { Organo, Sede } = require("../models");

const mostrarOrganos = async (req = request, res = response) => {
  try {
    const resp = await Organo.findAll({
      include: [
        {
          model: Sede,
        },
      ],
    });

    res.json({
      ok: true,
      msg: "Se muestran los organos con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};
const mostrarIdOrgano = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const resp = await Organo.findOne({
      where: {
        id,
      },
    });
    res.json({
      ok: true,
      msg: "Se muestra el organo con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};


const agregarOrgano = async (req = request, res = response) => {
  try {
    const { nombre, sigla, ...data } = req.body;
    data.nombre = nombre.toUpperCase();
    data.sigla = sigla.toUpperCase();
    const resp = await Organo.create(data);
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


const modificarOrgano = async (req = request, res = response) => {
  try {
    res.json({
      ok: true,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};


const eliminarOrgano = async (req = request, res = response) => {
  try {
    res.json({
      ok: true,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};


module.exports = {
  mostrarOrganos,
  mostrarIdOrgano,
  agregarOrgano,
  modificarOrgano,
  eliminarOrgano,
};
