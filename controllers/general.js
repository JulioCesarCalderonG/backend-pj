const { request, response } = require("express");
const { General } = require("../models");

const mostrarGeneral = async (req = request, res = response) => {
  const resp = await General.findAll();
  res.json({
    ok: true,
    msg: "Se muestran los datos correctamente",
    resp,
  });
};

const agregarGeneral = async (req = request, res = response) => {
  try {
    const {
      idpersonal,
      idtipodocumento,
      idcargo,
      iddependencia,
      idarea,
      inicio,
      fin,
      documento,
      ...data
    } = req.body;

    data.id_personal = idpersonal;
    data.id_tipo_documento = idtipodocumento;
    data.id_cargo = idcargo;
    data.id_dependencia = iddependencia;
    data.id_area = idarea;
    data.inicio = inicio.toUpperCase();
    data.fin = fin.toUpperCase();
    data.documento = documento.toUpperCase();

    const resp = await General.create(data);

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

const modificarGeneral = (req = request, res = response) => {};

const eliminarGeneral = (req = request, res = response) => {};

module.exports = {
  mostrarGeneral,
  agregarGeneral,
  modificarGeneral,
  eliminarGeneral,
};
