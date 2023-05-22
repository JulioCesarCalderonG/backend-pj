const { request, response } = require("express");
const { Area } = require("../models");

const mostrarAreas = async (req = request, res = response) => {
  const resp = await Area.findAll();
  res.json({
    ok: true,
    msg: "Se muestran los datos correctamente",
    resp,
  });
};

const agregarArea = async (req = request, res = response) => {
  try {
    const { nombre, sigla, ...data } = req.body;
    data.nombre = nombre.toUpperCase();
    data.sigla = sigla.toUpperCase();

    const resp = await Area.create(data);

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

const modificarArea = (req = request, res = response) => {};

const eliminarArea = (req = request, res = response) => {};

module.exports = {
  mostrarAreas,
  agregarArea,
  modificarArea,
  eliminarArea,
};
