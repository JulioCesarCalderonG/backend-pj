const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');


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


module.exports = Cargo