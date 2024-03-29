const {
  Area,
  Cargo,
  Tipodocumento,
  Personal,
  Administrador,
  Sede,
  DetalleLicencia,
} = require('../models');
const TipoLicencia = require('../models/tipo-licencia');

const validarNombreArea = async (nombre = '') => {
  const existeArea = await Area.findOne({
    where: {
      nombre: `${nombre.toUpperCase()}`,
    },
  });
  if (existeArea) {
    throw new Error(`El nombre ${nombre} ya está registrado en la BD`);
  }
};

const validarSiglaArea = async (sigla = '') => {
  const existeArea = await Area.findOne({
    where: {
      sigla: `${sigla.toUpperCase()}`,
    },
  });
  if (existeArea) {
    throw new Error(`La sigla ${sigla} ya está registrado en la BD`);
  }
};

const validarDescripcionCargo = async (descripcion = '') => {
  const existeCargo = await Cargo.findOne({
    where: {
      descripcion: `${descripcion.toUpperCase()}`,
    },
  });
  if (existeCargo) {
    throw new Error(`El Cargo ${descripcion} ya está registrado en la BD`);
  }
};

const validarDescripcionTipodocumento = async (descripcion = '') => {
  const existeTipodocumento = await Tipodocumento.findOne({
    where: {
      descripcion: `${descripcion.toUpperCase()}`,
    },
  });
  if (existeTipodocumento) {
    throw new Error(
      `El Tipo documento ${descripcion} ya está registrado en la BD`
    );
  }
};

const validarDniPersonal = async (dni = '') => {
  const existePersonal = await Personal.findOne({
    where: {
      dni: `${dni.toUpperCase()}`,
    },
  });
  if (existePersonal) {
    throw new Error(`El dni ${dni} ya está registrado en la BD`);
  }
};

const validarNombrePersonal = async (nombre = '') => {
  const existePersonal = await Personal.findOne({
    where: {
      nombre: `${nombre.toUpperCase()}`,
    },
  });
  if (existePersonal) {
    throw new Error(`El nombre ${nombre} ya está registrado en la BD`);
  }
};

const validarApellidoPersonal = async (apellido = '') => {
  const existePersonal = await Personal.findOne({
    where: {
      apellido: `${apellido.toUpperCase()}`,
    },
  });
  if (existePersonal) {
    throw new Error(`El apellido ${apellido} ya está registrado en la BD`);
  }
};

const validarEscalafonPersonal = async (escalafon = '') => {
  const existePersonal = await Personal.findOne({
    where: {
      escalafon: `${escalafon.toUpperCase()}`,
    },
  });
  if (existePersonal) {
    throw new Error(`El escalafon ${escalafon} ya está registrado en la BD`);
  }
};

const validarUsuarioAdministrador = async (usuario = '') => {
  const existeAdministrador = await Administrador.findOne({
    where: {
      usuario: `${usuario.toUpperCase()}`,
    },
  });
  if (existeAdministrador) {
    throw new Error(`El usuario ${usuario} ya está registrado en la BD`);
  }
};

const validarNombreSede = async (nombre = '') => {
  const existeSede = await Sede.findOne({
    where: {
      nombre: `${nombre.toUpperCase()}`,
    },
  });
  if (existeSede) {
    throw new Error(
      `La Sede ${nombre} ya está registrado en la BD`
    );
  }
};

const validarNombreOrgano = async (nombre = '') => {
  const existeSede = await Sede.findOne({
    where: {
      nombre: `${nombre.toUpperCase()}`,
    },
  });
  if (existeSede) {
    throw new Error(
      `El organo ${nombre} ya está registrado en la BD`
    );
  }
};

const validarNombreUnidadOrganica = async (nombre = '') => {
  const existeSede = await Sede.findOne({
    where: {
      nombre: `${nombre.toUpperCase()}`,
    },
  });
  if (existeSede) {
    throw new Error(
      `La Unidad Organica ${nombre} ya está registrado en la BD`
    );
  }
};

const validarNombreTipoLicencia = async (nombre = '') => {
  const existeTipoLicencia = await TipoLicencia.findOne({
    where: {
      nombre: `${nombre.toUpperCase()}`,
    },
  });
  if (existeTipoLicencia) {
    throw new Error(
      `El Tipo Licencia ${nombre} ya está registrado en la BD`
    );
  }
};

const validarNombreDetalleLicencia = async (nombre = '') =>{
  const existeDetalleLicencia = await DetalleLicencia.findOne({
    where:{
      nombre: `${nombre.toUpperCase()}`,
    },
  });
  if (existeDetalleLicencia) {
    throw new Error(
      `El Detalle Licencia ${nombre} ya está registrado en la BD`
    );
  }
}

module.exports = {
  validarNombreArea,
  validarSiglaArea,
  validarDescripcionCargo,
  validarDescripcionTipodocumento,
  validarDniPersonal,
  validarNombrePersonal,
  validarApellidoPersonal,
  validarEscalafonPersonal,
  validarUsuarioAdministrador,
  validarNombreArea,
  validarNombreSede,
  validarNombreOrgano,
  validarNombreUnidadOrganica,
  validarNombreTipoLicencia,
  validarNombreDetalleLicencia
};
