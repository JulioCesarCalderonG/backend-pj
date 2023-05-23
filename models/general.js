const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');


class General extends Model{}

General.init({
    id_personal:{
        type:DataTypes.INTEGER
    },
    id_tipo_documento:{
        type:DataTypes.INTEGER
    },
    id_cargo:{
        type:DataTypes.INTEGER
    },
    id_dependencia:{
        type:DataTypes.INTEGER
    },
    id_area:{
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
    }
},{
    sequelize,
    timestamps:false,
    tableName:'general'
});


module.exports = General;