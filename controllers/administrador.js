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
    const { usuario, password, ...data } = req.body;
    data.usuario = usuario.toUpperCase();
    data.password = password.toUpperCase();

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
    const { usuario, password, ...data } = req.body;
    const { id } = req.params;

    data.usuario = usuario.toUpperCase();
    data.password = password.toUpperCase();

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


const mostrarIdAdministrador = async (req = request, res = response) => {
  try {
   const { id } = req.params;
 
   const resp = await Administrador.findOne({
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

const eliminarAdministradores = (req = request, res = response) => {};

module.exports = {
  mostrarAdministradores,
  agregarAdministradores,
  modificarAdministradores,
  eliminarAdministradores,
  mostrarIdAdministrador,
};
