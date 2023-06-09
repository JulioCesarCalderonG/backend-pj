const { request, response } = require("express");
const fs = require("fs");
const path = require("path");
const pdf = require("pdf-creator-node");
const {
  Organo,
  Personal,
  Cargo,
  General,
  UnidadOrganica,
  Area,
  Sede,
} = require("../models");
const { Op } = require("sequelize");
const Licencia = require("../models/licencia");
const DetalleLicencia = require("../models/detalle-licencia");
const TipoLicencia = require("../models/tipo-licencia");
const postRecordLaboral = async (req = request, res = response) => {
  try {
    const {
      tipofiltro,
      tipodependencia,
      dependencia,
      personal,
      fechainicio,
      fechafin,
    } = req.body;
    const fechafinal = fechafin === "" ? "2030-12-30" : fechafin;

    let array = [];
    let data = [];
    let nombredepedencia = "";
    let sede = "";
    const options = {
      format: "A3",
      orientation: "landscape",
      border: "10mm",
      header: {
        height: "0mm",
        contents: '<div style="text-align: center;">Author: Shyam Hajare</div>',
      },
      footer: {
        height: "28mm",
        contents: {
          first: "Cover page",
          2: "Second page", // Any page number is working. 1-based index
          default:
            '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
          last: "Last Page",
        },
      },
    };

    if (tipofiltro === "1") {
      switch (tipodependencia) {
        case "1":
          const organo = await Organo.findOne({
            where: {
              id: dependencia,
            },
            include: [
              {
                model: Sede,
              },
            ],
          });
          const resp = await General.findAll({
            where: {
              [Op.and]: [
                {
                  dependencia: organo.nombre,
                },
                {
                  inicio: {
                    [Op.gte]: fechainicio,
                  },
                },
                {
                  fin: {
                    [Op.lte]: fechafinal,
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
          data = resp;
          nombredepedencia = organo.nombre;
          sede = organo.Sede.nombre;
          break;
        case "2":
          const unidad = await UnidadOrganica.findOne({
            where: {
              id: dependencia,
            },
            include: [
              {
                model: Organo,
                include: [
                  {
                    model: Sede,
                  },
                ],
              },
            ],
          });
          const resp2 = await General.findAll({
            where: {
              [Op.and]: [
                {
                  dependencia: unidad.nombre,
                },
                {
                  inicio: {
                    [Op.gte]: fechainicio,
                  },
                },
                {
                  fin: {
                    [Op.lte]: fechafinal,
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
          data = resp2;
          nombredepedencia = unidad.nombre;
          sede = unidad.Organo.Sede.nombre;
          break;
        case "3":
          const area = await Area.findOne({
            where: {
              id: dependencia,
            },
            include: [
              {
                model: UnidadOrganica,
                include: [
                  {
                    model: Organo,
                    include: [
                      {
                        model: Sede,
                      },
                    ],
                  },
                ],
              },
            ],
          });
          const resp3 = await General.findAll({
            where: {
              [Op.and]: [
                {
                  dependencia: area.nombre,
                },
                {
                  inicio: {
                    [Op.gte]: fechainicio,
                  },
                },
                {
                  fin: {
                    [Op.lte]: fechafinal,
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
          data = resp3;
          nombredepedencia = area.nombre;
          sede = area.UnidadOrganica.Organo.Sede.nombre;
          break;
        default:
          break;
      }
    } else {
      const html = fs.readFileSync(
        path.join(__dirname, "../pdf/html/recordlaboral.html"),
        "utf-8"
      );
      const filename = Math.random() + "_doc" + ".pdf";
      const person = await Personal.findOne({
        where: {
          id: personal,
        },
      });
      const resp = await General.findAll({
        where: {
          id_personal: personal,
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
      if (resp.length === 0) {
        const prod = {
          id: "",
          documento: "",
          personal: "",
          dependencia: "",
          cargo: "",
          desde: "",
          hasta: "",
        };
        array.push(prod);
      } else {
        resp.forEach((d) => {
          let i = 1;
          const prod = {
            id: `${i}`,
            documento: d.codigo_documento,
            personal: `${d.Personal.nombre} ${d.Personal.apellido}`,
            dependencia: d.dependencia,
            cargo: `${d.Cargo.descripcion}`,
            desde: d.inicio,
            hasta: d.fin === "2030-12-30" ? "ACTUALIDAD" : d.fin,
          };
          i++;
          array.push(prod);
        });
      }
      const obj = {
        prodlist: array,
        personal: `${person.nombre} ${person.apellido}`,
        escalafon: person.escalafon,
        inicio: person.fecha_inicio,
      };
      const document = {
        html: html,
        data: {
          products: obj,
        },
        path: "./pdf/reportes/" + filename,
      };
      const archivo = await pdf.create(document, options);
      const nom = archivo.filename.split("\\");
      const nombre = nom[nom.length - 1];
      return res.json({
        ok: true,
        msg: "Se creo documento",
        nombre,
      });
    }
    const html = fs.readFileSync(
      path.join(__dirname, "../pdf/html/relacionpersonal.html"),
      "utf-8"
    );
    const filename = Math.random() + "_doc" + ".pdf";
    if (data.length === 0) {
      const prod = {
        id: "",
        documento: "",
        personal: "",
        dependencia: "",
        cargo: "",
        desde: "",
        hasta: "",
      };
      array.push(prod);
    } else {
      data.forEach((d) => {
        let i = 1;
        const prod = {
          id: `${i}`,
          documento: d.codigo_documento,
          personal: `${d.Personal.nombre} ${d.Personal.apellido}`,
          dependencia: d.dependencia,
          cargo: `${d.Cargo.descripcion}`,
          desde: d.inicio,
          hasta: d.fin === "2030-12-30" ? "ACTUALIDAD" : d.fin,
        };
        i++;
        array.push(prod);
      });
    }
    const obj = {
      prodlist: array,
      tipopersonal:
        tipodependencia === "1"
          ? "MAGISTRADOS Y PERSONAL JURISDICCIONAL"
          : "FUNCIONARIOS Y PERSONAL ADMINISTRATIVO",
      dependencia: nombredepedencia,
      sede: sede,
      inicio: fechainicio,
      fin: fechafin === "" ? "LA ACTUALIDAD" : fechafin,
    };
    const document = {
      html: html,
      data: {
        products: obj,
      },
      path: "./pdf/reportes/" + filename,
    };
    const archivo = await pdf.create(document, options);
    const nom = archivo.filename.split("\\");
    const nombre = nom[nom.length - 1];
    return res.json({
      ok: true,
      msg: "Se creo documento",
      nombre,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};
const postRecordLaboralPersona = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    let array = [];
    const options = {
      format: "A3",
      orientation: "landscape",
      border: "10mm",
      header: {
        height: "0mm",
        contents: '<div style="text-align: center;">Author: Shyam Hajare</div>',
      },
      footer: {
        height: "28mm",
        contents: {
          first: "Cover page",
          2: "Second page", // Any page number is working. 1-based index
          default:
            '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
          last: "Last Page",
        },
      },
    };

    const html = fs.readFileSync(
      path.join(__dirname, "../pdf/html/recordlaboral.html"),
      "utf-8"
    );
    const filename = Math.random() + "_doc" + ".pdf";
    const person = await Personal.findOne({
      where: {
        id,
      },
    });
    const depen = await General.findOne({
      where:{
        id_personal: id,
        fin:'2030-12-30'
      }
    })
    const resp = await General.findAll({
      where: {
        id_personal: id,
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
    if (resp.length === 0) {
      const prod = {
        id: "",
        documento: "",
        personal: "",
        dependencia: "",
        cargo: "",
        desde: "",
        hasta: "",
      };
      array.push(prod);
    } else {
      for (let i = 0; i < resp.length; i++) {
        const prod = {
          id: `${i+1}`,
          documento: resp[i].codigo_documento,
          dependencia: resp[i].dependencia,
          cargo: `${resp[i].Cargo.descripcion}`,
          desde: resp[i].inicio,
          hasta: resp[i].fin === "2030-12-30" ? "ACTUALIDAD" : resp[i].fin,
        };
        array.push(prod);
        
      }
    }
    const obj = {
      prodlist: array,
      personal: `${person.nombre} ${person.apellido}`,
      escalafon: person.escalafon,
      inicio: person.fecha_inicio,
      dependencia:depen.dependencia
    };
    const document = {
      html: html,
      data: {
        products: obj,
      },
      path: "./pdf/reportes/" + filename,
    };
    const archivo = await pdf.create(document, options);
    const nom = archivo.filename.split("\\");
    const nombre = nom[nom.length - 1];

    return res.json({
      ok: true,
      msg: "Se creo documento",
      nombre,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};
const postLicenciaPersona = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    let array = [];
    const options = {
      format: "A4",
      orientation: "portrait",
      border: "10mm",
      header: {
        height: "0mm",
        contents: '<div style="text-align: center;">Author: Shyam Hajare</div>',
      },
      footer: {
        height: "28mm",
        contents: {
          first: "Cover page",
          2: "Second page", // Any page number is working. 1-based index
          default:
            '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
          last: "Last Page",
        },
      },
    };

    const html = fs.readFileSync(
      path.join(__dirname, "../pdf/html/licenciapersonal.html"),
      "utf-8"
    );
    const filename = Math.random() + "_doc" + ".pdf";
    const person = await Personal.findOne({
      where: {
        id,
      },
    });
    const depen = await General.findOne({
      where:{
        id_personal: id,
        fin:'2030-12-30'
      }
    });
    
    const resp = await Licencia.findAll({
      where: {
        id_personal: id
      },
      include: [
        {
          model: Personal,
        },
        {
          model: DetalleLicencia,
          include:[
            {
              model:TipoLicencia
            }
          ]
        },
      ],
    });
    if (resp.length === 0) {
      const prod = {
        id: "",
        documento: "",
        personal: "",
        dependencia: "",
        cargo: "",
        desde: "",
        hasta: "",
      };
      array.push(prod);
    } else {
      for (let i = 0; i < resp.length; i++) {
        const prod = {
          id: `${i+1}`,
          documento: resp[i].codigo_documento,
          tipolicencia: resp[i].DetalleLicencium.TipoLicencium.nombre,
          detallelicencia: `${resp[i].DetalleLicencium.nombre}`,
          dias:resp[i].dias,
          desde: resp[i].inicio,
          hasta: resp[i].fin,
        };
        array.push(prod);
        
      }
    }
     const obj = {
      prodlist: array,
      personal: `${person.nombre} ${person.apellido}`,
      escalafon: person.escalafon,
      inicio: person.fecha_inicio,
      dependencia:depen.dependencia
    }; 
    const document = {
      html: html,
      data: {
        products: obj,
      },
      path: "./pdf/reportes/" + filename,
    };
    const archivo = await pdf.create(document, options);
    const nom = archivo.filename.split("\\");
    const nombre = nom[nom.length - 1];

    return res.json({
      ok: true,
      msg: "Se creo documento",
      nombre
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `Error: ${error}`,
    });
  }
};
const mostrarReporteRecordLaboral = async (req = request, res = response) => {
  try {
    const { nombre } = req.params;
    const pathImagen = path.join(__dirname, "../pdf", "reportes", nombre);
    return res.sendFile(pathImagen);
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};
const mostrarLicenciaLaboral = async (req = request, res = response) => {
  try {
    const { nombre } = req.params;
    const pathImagen = path.join(__dirname, "../pdf", "reportes", nombre);
    return res.sendFile(pathImagen);
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: `${error}`,
    });
  }
};
module.exports = {
  postRecordLaboral,
  postRecordLaboralPersona,
  postLicenciaPersona,
  postLicenciaPersona,
  mostrarReporteRecordLaboral,
  mostrarLicenciaLaboral
};
