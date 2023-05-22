const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');


class General extends Model{}

General.init({
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