const { request, response } = require("express");
const { subirArchivo } = require("../helpers");
const { Vacacional, RegimenLaboral } = require("../models");

const mostrarVacacionalPersonal = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const resp = await Vacacional.findAll({
      include:[
        {
          model:RegimenLaboral,
          where:{
            id_personal:id
          }
        }
      ],
      order: [
        ["periodo", "ASC"],
        ["inicio", "ASC"],
      ]
    });
    let array = [];
    if (resp.length > 0) {
      for (let i = 0; i < resp.length; i++) {
        const data = {
          ids: i + 1,
          id: resp[i].id,
          codigo_documento: resp[i].codigo_documento,
          periodo: resp[i].periodo,
          inicio: resp[i].inicio,
          termino: resp[i].termino,
          dias: resp[i].dias,
          id_personal: resp[i].id_personal,
          documento: resp[i].documento,
        };
        array.push(data);
      }
    }
    res.json({
      ok: true,
      msg: "Se muestran los datos con exito",
      resp: array,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const guardarVacacional = async (req = request, res = response) => {
  try {
    const file = req.files;
    const { tipo_documento, area, numero, ano, inicio, fin, ...data } =
      req.body;
    let codigodoc = "";
    if (tipo_documento === "1") {
      switch (area) {
        case "1":
          codigodoc = `R.A N° ${numero}-${ano}-P-CSJUC/PJ`;
          break;
        case "2":
          codigodoc = `R.A N° ${numero}-${ano}-GAD-CSJUC/PJ`;
          break;
        default:
          break;
      }
    }
    if (tipo_documento === "2") {
      switch (area) {
        case "1":
          codigodoc = `MEMORANDUM N° ${numero}-${ano}-GAD-CSJUC/PJ`;
          break;
        case "2":
          codigodoc = `MEMORANDUM N° ${numero}-${ano}-UAF-GAD-CSJUC/PJ`;
          break;
        case "3":
          codigodoc = `MEMORANDUM N° ${numero}-${ano}-OA-CSJUC/PJ`;
          break;
        default:
          break;
      }
    }
    data.codigo_documento = codigodoc;
    data.inicio = inicio;
    data.termino = fin;
    data.tipo_documento = tipo_documento;
    data.area = area;
    data.numero = numero;
    data.ano = ano;
    const inicioarr = inicio.split("-");
    const finarr = fin.split("-");
    const fechaInicio = new Date(
      `${inicioarr[1]}/${inicioarr[2]}/${inicioarr[0]}`
    );
    const fechaFin = new Date(`${finarr[1]}/${finarr[2]}/${finarr[0]}`);
    const dias =
      (fechaFin.getTime() - fechaInicio.getTime()) / 1000 / 60 / 60 / 24 + 1;
    const documento = await subirArchivo(file, ["pdf"], "vacacional");
    data.documento = documento;
    data.dias = dias;
    const resp = await Vacacional.create(data);
    res.json({
      ok: true,
      msg: "Se creo record vacacional con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const editarVacacional = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { tipo_documento, area, numero, ano, inicio, fin, ...data } =
      req.body;
    let codigodoc = "";
    if (tipo_documento === "1") {
      switch (area) {
        case "1":
          codigodoc = `R.A N° ${numero}-${ano}-P-CSJUC/PJ`;
          break;
        case "2":
          codigodoc = `R.A N° ${numero}-${ano}-GAD-CSJUC/PJ`;
          break;
        default:
          break;
      }
    }
    if (tipo_documento === "2") {
      switch (area) {
        case "1":
          codigodoc = `MEMORANDUM N° ${numero}-${ano}-GAD-CSJUC/PJ`;
          break;
        case "2":
          codigodoc = `MEMORANDUM N° ${numero}-${ano}-UAF-GAD-CSJUC/PJ`;
          break;
        case "3":
          codigodoc = `MEMORANDUM N° ${numero}-${ano}-OA-CSJUC/PJ`;
          break;
        default:
          break;
      }
    }
    data.codigo_documento = codigodoc;
    data.inicio = inicio;
    data.termino = fin;
    data.tipo_documento = tipo_documento;
    data.area = area;
    data.numero = numero;
    data.ano = ano;
    const inicioarr = inicio.split("-");
    const finarr = fin.split("-");
    const fechaInicio = new Date(
      `${inicioarr[1]}/${inicioarr[2]}/${inicioarr[0]}`
    );
    const fechaFin = new Date(`${finarr[1]}/${finarr[2]}/${finarr[0]}`);
    const dias =
      (fechaFin.getTime() - fechaInicio.getTime()) / 1000 / 60 / 60 / 24 + 1;
    data.dias = dias;
    const resp = await Vacacional.update(data, {
      where: {
        id,
      },
    });
    res.json({
      ok: true,
      msg: "Se edito record vacacional con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const mostrarIdVacacional = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const resp = await Vacacional.findOne({
      where: {
        id,
      },
    });
    res.json({
      ok: true,
      msg: "Se muestra los datos correctamente",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error ${error}`,
    });
  }
};

const mostrarVacacional = async (req = request, res=response) => {};


const eliminarVacacional = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const resp = await Vacacional.destroy({
      where: {
        id
      }
    });
    res.json({
      ok: true,
      msg: "Record Vacacional eliminado con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

module.exports = {
  mostrarVacacionalPersonal,
  guardarVacacional,
  mostrarIdVacacional,
  editarVacacional,
  mostrarVacacional,
  eliminarVacacional,
};
