const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');


class Vacacional extends Model{}

Vacacional.init({
    codigo_documento:{
        type:DataTypes.STRING
    },
    periodo:{
        type:DataTypes.CHAR
    },
    inicio:{
        type:DataTypes.CHAR
    },
    termino:{
        type:DataTypes.CHAR
    },
    dias:{
        type:DataTypes.CHAR
    },
    id_personal:{
        type:DataTypes.INTEGER
    },
    documento:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    tableName:'vacacional',
    timestamps:false
});



module.exports = Vacacional;