const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');


class Area extends Model{}

Area.init({
    nombre:{
        type:DataTypes.STRING
    },
    sigla:{
        type:DataTypes.CHAR
    }
},{
    sequelize,
    timestamps:false,
    tableName:'area'
});


module.exports = Area;