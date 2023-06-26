const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');


class RegimenLaboral extends Model{};


RegimenLaboral.init({
    id_condicion:{
        type:DataTypes.INTEGER
    },
    id_personal:{
        type:DataTypes.INTEGER
    },
    id_tipo_personal:{
        type:DataTypes.INTEGER
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    },
    inicio:{
        type:DataTypes.CHAR
    },
    fin:{
        type:DataTypes.CHAR
    }
},{
    sequelize,
    tableName:'regimen_laboral',
    timestamps:false
});


module.exports = RegimenLaboral