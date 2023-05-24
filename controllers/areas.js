const { request, response } = require('express');
const { Area } = require('../models');


const mostrarAreas = async (req = request, res = response) => {
  const resp = await Area.findAll();
  res.json({
    ok: true,
    msg: 'Se muestran los datos correctamente',
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
      msg: 'Datos ingresados correctamente',
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const modificarArea = async (req = request, res = response) => {
  try {
    const { nombre, sigla, ...data } = req.body;
    const { id } = req.params;
    data.nombre = nombre.toUpperCase();
    data.sigla = sigla.toUpperCase();

    const resp = await Area.update(data, {
      where: {
        id,
      },
    });

    res.json({
      ok:true,
      msg:'Area actualizado con exito',
      resp
    });
  } catch (error) {
    res.status(400).json({
      ok:false,
      msg:`Error:${error}`
    })
  }
};

const mostrarIdArea = async (req = request, res = response) => {
 try {
  const { id } = req.params;

  const resp = await Area.findOne({
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

const eliminarArea = (req = request, res = response) => {};

module.exports = {
  mostrarAreas,
  agregarArea,
  modificarArea,
  eliminarArea,
  mostrarIdArea,
};
