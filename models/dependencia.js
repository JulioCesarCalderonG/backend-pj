const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const General = require("./general");


class Dependencia extends Model{}

Dependencia.init({
    descripcion:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    timestamps:false,
    tableName:'dependencia'
});

Dependencia.hasMany(General,{
    as:'FK_GeneralDependencia',
    foreignKey:'id_dependencia'
});

General.belongsTo(Dependencia,{
    sourcekey:'id',
    foreignKey:'id_dependencia'
})

module.exports = Dependencia