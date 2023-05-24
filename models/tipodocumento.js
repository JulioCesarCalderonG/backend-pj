const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const General = require("./general");


class Tipodocumento extends Model{}

Tipodocumento.init({
    descripcion:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    timestamps:false,
    tableName:'tipo_documento'
})

Tipodocumento.hasMany(General,{
    as:'FK_GeneralTipoDocumento',
    foreignKey:'id_tipo_documento'
});

General.belongsTo(Tipodocumento,{
    sourcekey:'id',
    foreignKey:'id_tipo_documento'
})

module.exports = Tipodocumento