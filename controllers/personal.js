const { request, response } = require("express");
const { Personal } = require("../models");

const mostrarPersonales = async (req = request, res = response) => {
  const resp = await Personal.findAll();
  res.json({
    ok: true,
    msg: "Se muestran los datos correctamente",
    resp,
  });
};

const agregarPersonal = async (req = request, res = response) => {
  try {
    const { nombre, apellido, escalafon, fechainicio, ...data } = req.body;
    data.nombre = nombre.toUpperCase();
    data.apellido = apellido.toUpperCase();
    data.escalafon = escalafon.toUpperCase();
    data.fechainicio = fechainicio.toUpperCase();

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

const modificarPersonal = (req = request, res = response) => {};

const eliminarPersonal = (req = request, res = response) => {};

module.exports = {
  mostrarPersonales,
  agregarPersonal,
  modificarPersonal,
  eliminarPersonal,
};
