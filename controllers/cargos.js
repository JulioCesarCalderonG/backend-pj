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

const modificarCargo = (req = request, res = response) => {};

const eliminarCargo = (req = request, res = response) => {};

module.exports = {
  mostrarCargos,
  agregarCargo,
  modificarCargo,
  eliminarCargo,
};
