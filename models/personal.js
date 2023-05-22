const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');


class Personal extends Model{}


Personal.init({
    nombre:{
        type:DataTypes.STRING
    },
    apellido:{
        type:DataTypes.STRING
    },
    escalafon:{
        type:DataTypes.CHAR
    },
    fecha_inicio:{
        type:DataTypes.CHAR
    }
},{
    timestamps:false,
    tableName:'personal',
    sequelize
});

module.exports = Personal;








