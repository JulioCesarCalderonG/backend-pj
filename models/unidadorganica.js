const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const General = require("./general");


class UnidadOrganica extends Model{}

UnidadOrganica.init({
    nombre:{
        type:DataTypes.STRING
    },
    sigla:{
        type:DataTypes.CHAR
    },
    id_organo:{
        type:DataTypes.INTEGER
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    timestamps:false,
    tableName:'unidad_organica'
});

module.exports = UnidadOrganica