const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');


class Administrador extends Model{}

Administrador.init({
    usuario:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    activo:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    timestamps:false,
    tableName:'administrador'
});


module.exports = Administrador

