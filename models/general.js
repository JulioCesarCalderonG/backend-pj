const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database');

class General extends Model {}

General.init(
  {
    codigo_documento: {
      type: DataTypes.CHAR,
    },
    dependencia: {
      type: DataTypes.CHAR,
    },
    id_personal: {
      type: DataTypes.INTEGER,
    },
    id_cargo: {
      type: DataTypes.INTEGER,
    },
    inicio: {
      type: DataTypes.STRING,
    },
    fin: {
      type: DataTypes.STRING,
    },
    documento: {
      type: DataTypes.STRING,
    },
    periodo: {
      type: DataTypes.TINYINT,
    },
    tipo_documento:{
        type:DataTypes.INTEGER
    },
    tipo_dependencia:{
        type:DataTypes.INTEGER
    },
    tipo_sigla:{
        type:DataTypes.INTEGER
    },
    numero:{
        type:DataTypes.CHAR
    },
    ano:{
        type:DataTypes.CHAR
    },
    id_dependencia:{
        type:DataTypes.INTEGER
    },
    id_area: {
        type:DataTypes.INTEGER
    },
  },
  {
    sequelize,
    timestamps: false,
    tableName: 'general',
  }
);

module.exports = General;
