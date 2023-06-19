const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const generarToken = require('../helpers/generar-jwt');
const { Administrador } = require('../models');

const postLogin = async (req = request, res = response) => {
 
  const {usuario,password} = req.body;
  const user = await Administrador.findOne({ usuario });
  if (!user) {
    return res.json({
      ok: false,
      msg: 'Usuario no existe, converse con el administrador',
      user: null,
      token: null,
    });
  }
  if (!user.activo) {
    return res.json({
      ok: false,
      msg: 'Usuario bloqueado, converse con el administrador',
      user: null,
      token: null,
    });
  }
  
  if (password!==user.password) {
    return res.json({
      ok: false,
      msg: 'Contraseña no valida',
      user: null,
      token: null,
    });
  }
  token = await generarToken.generarJWT(user._id);
  res.json({
    ok: true,
    msg: 'Login correcto',
    user,
    token,
  });
};

module.exports = {
  postLogin,
};
