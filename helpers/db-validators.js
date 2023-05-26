const {
  Dependencia,
  Area,
  Cargo,
  Tipodocumento,
  Personal,
  Administrador,
} = require("../models");

const validarDescripcionDependencia = async (descripcion = "") => {
  const existeDependencia = await Dependencia.findOne({
    where: {
      descripcion: `${descripcion.toUpperCase()}`,
    },
  });
  if (existeDependencia) {
    throw new Error(
      `La Dependencia ${descripcion} ya está registrado en la BD`
    );
  }
};

const validarNombreArea = async (nombre = "") => {
  const existeArea = await Area.findOne({
    where: {
      nombre: `${nombre.toUpperCase()}`,
    },
  });
  if (existeArea) {
    throw new Error(`El nombre ${nombre} ya está registrado en la BD`);
  }
};

const validarSiglaArea = async (sigla = "") => {
  const existeArea = await Area.findOne({
    where: {
      sigla: `${sigla.toUpperCase()}`,
    },
  });
  if (existeArea) {
    throw new Error(`La sigla ${sigla} ya está registrado en la BD`);
  }
};

const validarDescripcionCargo = async (descripcion = "") => {
  const existeCargo = await Cargo.findOne({
    where: {
      descripcion: `${descripcion.toUpperCase()}`,
    },
  });
  if (existeCargo) {
    throw new Error(`El Cargo ${descripcion} ya está registrado en la BD`);
  }
};

const validarDescripcionTipodocumento = async (descripcion = "") => {
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

const validarNombrePersonal = async (nombre = "") => {
  const existePersonal = await Personal.findOne({
    where: {
      nombre: `${nombre.toUpperCase()}`,
    },
  });
  if (existePersonal) {
    throw new Error(`El nombre ${nombre} ya está registrado en la BD`);
  }
};

const validarApellidoPersonal = async (apellido = "") => {
  const existePersonal = await Personal.findOne({
    where: {
      apellido: `${apellido.toUpperCase()}`,
    },
  });
  if (existePersonal) {
    throw new Error(`El apellido ${apellido} ya está registrado en la BD`);
  }
};

const validarEscalafonPersonal = async (escalafon = "") => {
  const existePersonal = await Personal.findOne({
    where: {
      escalafon: `${escalafon.toUpperCase()}`,
    },
  });
  if (existePersonal) {
    throw new Error(`El escalafon ${escalafon} ya está registrado en la BD`);
  }
};

const validarUsuarioAdministrador = async (usuario = "") => {
    const existeAdministrador = await Administrador.findOne({
      where: {
        usuario: `${usuario.toUpperCase()}`,
      },
    });
    if (existeAdministrador) {
      throw new Error(`El usuario ${usuario} ya está registrado en la BD`);
    }
  };

module.exports = {
  validarDescripcionDependencia,
  validarNombreArea,
  validarSiglaArea,
  validarDescripcionCargo,
  validarDescripcionTipodocumento,
  validarNombrePersonal,
  validarApellidoPersonal,
  validarEscalafonPersonal,
  validarUsuarioAdministrador,
};
