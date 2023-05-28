const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');


class Organo extends Model{};



Organo.init({
    nombre:{
        type:DataTypes.STRING
    },
    sigla:{
        type:DataTypes.CHAR
    },
    id_sede:{
        type:DataTypes.INTEGER
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    tableName:'organo',
    timestamps:false
});

module.exports = Organo;