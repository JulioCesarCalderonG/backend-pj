const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const General = require("./general");


class Cargo extends Model{}

Cargo.init({
    descripcion:{
        type:DataTypes.STRING
    }
},{
    sequelize,
    timestamps:false,
    tableName:'cargo'
});

Cargo.hasMany(General,{
    as:'FK_GeneralCargo',
    foreignKey:'id_cargo'
});

General.belongsTo(Cargo,{
    sourcekey:'id',
    foreignKey:'id_cargo'
})

module.exports = Cargo

