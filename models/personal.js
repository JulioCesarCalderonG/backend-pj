const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const General = require("./general");
const Licencia = require("./licencia");


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
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    timestamps:false,
    tableName:'personal',
    sequelize
});
/* Relacion personal general */
Personal.hasMany(General,{
    as:'FK_GeneralPersonal',
    foreignKey:'id_personal'
});

General.belongsTo(Personal,{
    sourcekey:'id',
    foreignKey:'id_personal'
});

/* Relacion general licencia */
Personal.hasMany(Licencia,{
    as:'FK_LicenciaPersonal',
    foreignKey:'id_personal'
});

Licencia.belongsTo(Personal,{
    sourcekey:'id',
    foreignKey:'id_personal'
})

module.exports = Personal;








