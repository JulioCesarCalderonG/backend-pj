const { request, response } = require('express');
const {
  General,
  Cargo,
  Area,
  dependencia,
  Tipodocumento,
  Personal,
  Organo,
  UnidadOrganica,
  TipoPersonal,
} = require('../models');
const { obtenerDependencia } = require('../helpers/obtener-depedencia');
const { Op } = require('sequelize');
const { subirArchivo } = require('../helpers');
const mostrarGeneral = async (req = request, res = response) => {
  const { tipofiltro, dato } = req.query;
  if (tipofiltro === '' && dato === '') {
    const resp = await General.findAll({
      include: [
        {
          model: Personal,
        },
        {
          model: Cargo,
        },
      ],
    });
    return res.json({
      ok: true,
      msg: 'Se muestran los datos correctamente',
      resp,
    });
  }

  switch (tipofiltro) {
    case '1':
      const resps = await General.findAll({
        where: {
          [Op.or]: [
            {
              codigo_documento: {
                [Op.startsWith]: `%${dato}%`,
              },
            },
          ],
        },
        include: [
          {
            model: Personal,
          },
          {
            model: Cargo,
          },
        ],
      });
      return res.json({
        ok: true,
        msg: 'Se muestran los datos correctamente',
        resp: resps,
      });
    case '2':
      const reps = await General.findAll({
        where: {
          [Op.or]: [
            {
              dependencia: {
                [Op.startsWith]: `%${dato}%`,
              },
            },
          ],
        },
        include: [
          {
            model: Personal,
          },
          {
            model: Cargo,
          },
        ],
      });
      return res.json({
        ok: true,
        msg: 'Se muestran los datos correctamente',
        resp: reps,
      });
    case '3':
      const resp = await General.findAll({
        include: [
          {
            model: Personal,
            where: {
              [Op.or]: [
                {
                  nombre: {
                    [Op.startsWith]: `%${dato}%`,
                  },
                },
                {
                  apellido: {
                    [Op.startsWith]: `%${dato}%`,
                  },
                },
              ],
            },
          },
          {
            model: Cargo,
          },
        ],
      });
      return res.json({
        ok: true,
        msg: 'Se muestran los datos correctamente',
        resp,
      });
    default:
      return res.json({
        ok: true,
        msg: 'Se muestran los datos correctamente',
        resp: null,
      });
  }
};
const mostrarGeneralPersonal = async (req = request, res = response) => {
  const { id } = req.params;

  const resp = await General.findAll({
    where: {
      id_personal: id,
    },
    order: [['inicio', 'ASC']],
    include: [
      {
        model: Personal,
      },
      {
        model: Cargo,
      },
    ],
  });
  let array = [];
  if (resp.length > 0) {
    for (let i = 0; i < resp.length; i++) {
      const data = {
        ids: i + 1,
        id: resp[i].id,
        codigo_documento: resp[i].codigo_documento,
        dependencia: resp[i].dependencia,
        id_personal: resp[i].id_personal,
        id_cargo: resp[i].id_cargo,
        inicio: resp[i].inicio,
        fin: resp[i].fin,
        documento: resp[i].documento,
        Personal: resp[i].Personal,
        Cargo: resp[i].Cargo,
      };
      array.push(data);
    }
  }
  return res.json({
    ok: true,
    msg: 'Se muestran los datos correctamente',
    resp: array,
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
    const file = req.files;
    const documento = await subirArchivo(file, ['pdf'], 'record-laboral');
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
        fin: hasta === '' ? '2030-12-30' : hasta,
        documento,
        periodo: data.periodo,
        tipo_documento,
        tipo_dependencia,
        id_dependencia: dependencia,
      };
      const general = await General.create(datos);
      return res.json({
        ok: true,
        msg: 'Datos editados con exito',
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
        fin: hasta === '' ? '2030-12-30' : hasta,
        documento,
        periodo: data.periodo,
        tipo_documento,
        tipo_dependencia,
        numero,
        ano,
        id_dependencia: dependencia,
      };
      const general = await General.create(datos);
      return res.json({
        ok: true,
        msg: 'Datos editados con exito',
        resp: general,
      });
    } else {
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
            fin: hasta === '' ? '2030-12-30' : hasta,
            documento,
            periodo: data.periodo,
            tipo_documento,
            tipo_dependencia,
            tipo_sigla,
            numero,
            ano,
            id_dependencia: dependencia,
            id_area: autoriza,
          };
          const general = await General.create(datos);
          return res.json({
            ok: true,
            msg: 'Datos editados con exito',
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
    const { id } = req.params;
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
        fin: hasta === '' ? '2030-12-30' : hasta,
        periodo: data.periodo,
        tipo_documento,
        tipo_dependencia,
        id_dependencia: dependencia,
      };
      const general = await General.update(datos, {
        where: {
          id,
        },
      });
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
        fin: hasta === '' ? '2030-12-30' : hasta,
        periodo: data.periodo,
        tipo_documento,
        tipo_dependencia,
        numero,
        ano,
        id_dependencia: dependencia,
      };
      const general = await General.update(datos, {
        where: {
          id,
        },
      });
      return res.json({
        ok: true,
        msg: 'Datos ingresados con exitos',
        resp: general,
      });
    } else {
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
            fin: hasta === '' ? '2030-12-30' : hasta,
            periodo: data.periodo,
            tipo_documento,
            tipo_dependencia,
            tipo_sigla,
            numero,
            ano,
            id_dependencia: dependencia,
            id_area: autoriza,
          };
          const general = await General.update(datos, {
            where: {
              id,
            },
          });
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

const mostrarIdGeneral = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const resp = await General.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Cargo,
          include: [
            {
              model: TipoPersonal,
            },
          ],
        },
      ],
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

const eliminarGeneral = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const resp = await General.destroy({
      where: {
        id,
      },
    });

    res.json({
      ok: true,
      msg: 'Record eliminado con exito',
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
  mostrarGeneral,
  mostrarGeneralPersonal,
  agregarGeneral,
  modificarGeneral,
  eliminarGeneral,
  mostrarIdGeneral,
};
