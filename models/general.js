const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');


class General extends Model{}

General.init({
    codigo_documento:{
        type:DataTypes.CHAR
    },
    dependencia:{
        type:DataTypes.CHAR
    },
    id_personal:{
        type:DataTypes.INTEGER
    },
    id_cargo:{
        type:DataTypes.INTEGER
    },
    inicio:{
        type:DataTypes.STRING
    },
    fin:{
        type:DataTypes.STRING
    },
    documento:{
        type:DataTypes.STRING
    },
    periodo:{
        type:DataTypes.TINYINT
    }
},{
    sequelize,
    timestamps:false,
    tableName:'general'
});


module.exports = General;