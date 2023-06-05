const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const Cargo = require("./cargo");

class TipoPersonal extends Model{};


TipoPersonal.init({
    titulo:{
        type:DataTypes.STRING
    },
    estado:{
        type:DataTypes.TINYINT,
        defaultValue:1
    }
},{
    sequelize,
    timestamps:false,
    tableName:'tipo_personal'
});


TipoPersonal.hasMany(Cargo,{
    as:'FK_CargoTipoPersonal',
    foreignKey:'id_tipo_personal'    
});

Cargo.belongsTo(TipoPersonal,{
    sourceKey:'id',
    foreignKey:'id_tipo_personal'
});



module.exports = TipoPersonal