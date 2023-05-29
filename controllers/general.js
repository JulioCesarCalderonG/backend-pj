const { request, response } = require('express');
const {
  General,
  Cargo,
  Area,
  Dependencia,
  Tipodocumento,
  Personal,
  Organo,
  UnidadOrganica,
} = require('../models');
const { obtenerDependencia } = require('../helpers/obtener-depedencia');

const mostrarGeneral = async (req = request, res = response) => {
  const resp = await General.findAll({
    include:[
      {
        model:Personal
      },{
        model:Cargo
      }
    ]
  });
  res.json({
    ok: true,
    msg: 'Se muestran los datos correctamente',
    resp,
  });
};

const agregarGeneral = async (req = request, res = response) => {
  try {
    const {
      tipo_sigla,
      autoriza,
      tipo_dependencia,
      dependencia,
      tipo_documento,
      ano,
      numero,
      desde,
      hasta,
      ...data
    } = req.body;
    let codigo = '';
    const tipodoc = await Tipodocumento.findOne({
      where: {
        id: tipo_documento,
      },
    });
    const depen = await obtenerDependencia(tipo_dependencia, dependencia);
    if (
      tipodoc.descripcion === 'BASE DE DATOS' ||
      tipodoc.descripcion === 'SIGA'
    ) {
      codigo = tipodoc.descripcion;
      const datos = {
        codigo_documento: codigo,
        id_personal: data.id_personal,
        id_cargo: data.id_cargo,
        inicio: desde,
        dependencia: depen,
        fin: hasta === '' ? 'ACTUALIDAD' : hasta,
      };
      const general = await General.create(datos);
      return res.json({
        ok: true,
        msg: 'Datos ingresados con exitoso',
        resp: general,
      });
    }
    if (tipodoc.descripcion === 'CONTRATO ADMINISTRATIVO') {
      if (numero === '' || ano === '') {
        return res.status(400).json({
          ok: false,
          msg: 'Completa bien los datos',
        });
      }
      codigo = `CONTRATO ADMINISTRATIVO N° ${numero}-${ano}`;
      const datos = {
        codigo_documento: codigo,
        id_personal: data.id_personal,
        id_cargo: data.id_cargo,
        inicio: desde,
        dependencia: depen,
        fin: hasta === '' ? 'ACTUALIDAD' : hasta,
      };
      const general = await General.create(datos);
      return res.json({
        ok: true,
        msg: 'Datos ingresados con exitos',
        resp: general,
      });
    }
    else{
      if (tipo_sigla !== '0') {
        if (autoriza !== '0') {
          switch (tipo_sigla) {
            case '1':
              const organo = await Organo.findOne({
                where: {
                  id: autoriza,
                },
              });
              codigo = `${tipodoc.descripcion} N° ${numero}-${ano}-${organo.sigla}-CSJUC/PJ`;
              break;
            case '2':
              const unidad = await UnidadOrganica.findOne({
                where: {
                  id: autoriza,
                },
                include: [
                  {
                    model: Organo,
                  },
                ],
              });
              codigo = `${tipodoc.descripcion} N° ${numero}-${ano}-${unidad.sigla}-${unidad.Organo.sigla}-CSJUC/PJ`;
              break;
            case '3':
              const area = await Area.findOne({
                where: {
                  id: autoriza,
                },
                include: [
                  {
                    model: UnidadOrganica,
                    include: [
                      {
                        model: Organo,
                      },
                    ],
                  },
                ],
              });
              codigo = `${tipodoc.descripcion} N° ${numero}-${ano}-${area.sigla}-${area.UnidadOrganica.sigla}-${area.UnidadOrganica.Organo.sigla}-CSJUC/PJ`;
              break;
            default:
              break;
          }
          const datos = {
            codigo_documento: codigo,
            id_personal: data.id_personal,
            id_cargo: data.id_cargo,
            inicio: desde,
            dependencia: depen,
            fin: hasta === '' ? 'ACTUALIDAD' : hasta,
          };
          const general = await General.create(datos);
          return res.json({
            ok: true,
            msg: 'Datos ingresados con exito',
            resp: general,
          });
        } else {
          return res.status(400).json({
            ok: false,
            msg: 'Selecciona bien los datos',
          });
        }
      }
      return res.status(400).json({
        ok: false,
        msg: 'Selecciona bien los datos',
      });
      
    }
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};

const modificarGeneral = async (req = request, res = response) => {
  try {
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
      where: {
        id,
      },
    });
    res.json({
      ok: true,
      msg: 'Id se muestran los datos correctamente',
      resp,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error:${error}`,
    });
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
