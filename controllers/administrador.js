const { request, response } = require("express");
const { Administrador } = require("../models");

const mostrarAdministradores = async (req = request, res = response) => {
  const resp = await Administrador.findAll();
  res.json({
    ok: true,
    msg: "Se muestran los datos correctamente",
    resp,
  });
};

const agregarAdministradores = async (req = request, res = response) => {
  try {
    const { usuario, password, activo, ...data } = req.body;
    data.usuario = usuario.toUpperCase();
    data.password = password.toUpperCase();
    data.activo = activo.toUpperCase();

    const resp = await Administrador.create(data);

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

const modificarAdministradores = async (req = request, res = response) => {
  try {
    const { usuario, password, activo, ...data } = req.body;
    const { id } = req.params;

    data.usuario = usuario.toUpperCase();
    data.password = password.toUpperCase();
    data.activo = activo.toUpperCase();

    const resp = await Administrador.update(data, {
      where: {
        id,
      },
    });

    res.json({
      resp
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};

const eliminarAdministradores = (req = request, res = response) => {};

module.exports = {
  mostrarAdministradores,
  agregarAdministradores,
  modificarAdministradores,
  eliminarAdministradores,
};
