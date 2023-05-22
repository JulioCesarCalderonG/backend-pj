const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');


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

module.exports = Dependencia