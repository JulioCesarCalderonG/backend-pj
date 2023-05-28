const { request, response } = require("express");
const { General, Cargo, Area, Dependencia, Tipodocumento, Personal } = require("../models");

const mostrarGeneral = async (req = request, res = response) => {
  const resp = await General.findAll({
    include:[
      {
        model:Cargo
      },
      {
        model:Area
      },
      {
        model:Dependencia
      },
      {
        model:Tipodocumento
      },
      {
        model:Personal
      }
    ]
  });
  res.json({
    ok: true,
    msg: "Se muestran los datos correctamente",
    resp,
  });
};

const agregarGeneral = async (req = request, res = response) => {
  try {
    const {
      numero_documento,
      ano,
      id_tipo_documento,
      id_area,
      ...data
    } = req.body;

    const respDocumento = await Tipodocumento.findOne({
      where:{
        id:id_tipo_documento
      }
    });
    const respArea = await Area.findOne({
      where:{
        id:id_area
      }
    })
    const codigo_documento = `${respDocumento.descripcion} N° ${numero_documento}-${ano}-${respArea.sigla}-CSJU/PJ`

    /* data.id_personal = idpersonal;
    data.id_tipo_documento = idtipodocumento;
    data.id_cargo = idcargo;
    data.id_dependencia = iddependencia;
    data.id_area = idarea;
    data.documento = documento.toUpperCase();

    const resp = await General.create(data);

    res.json({
      ok: true,
      msg: "Datos ingresados correctamente",
      resp,
    }); */
    res.json({
      data,
      codigo_documento,
      respDocumento,
      respArea
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const modificarGeneral = async (req = request, res = response) => {
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
    const { id } = req.params;

    data.id_personal = idpersonal;
    data.id_tipo_documento = idtipodocumento;
    data.id_cargo = idcargo;
    data.id_dependencia = iddependencia;
    data.id_area = idarea;
    data.inicio = inicio.toUpperCase();
    data.fin = fin.toUpperCase();
    data.documento = documento.toUpperCase();

    const resp = await General.update(data, {
      where: {
        id,
      },
    });

    res.json({
      ok: true,
      msg: "General actualizado con exito",
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
  }
};

const mostrarIdGeneral = async (req = request, res = response) => {
  try {
   const { id } = req.params;
 
   const resp = await General.findOne({
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

const eliminarGeneral = (req = request, res = response) => {};

module.exports = {
  mostrarGeneral,
  agregarGeneral,
  modificarGeneral,
  eliminarGeneral,
  mostrarIdGeneral,
};
