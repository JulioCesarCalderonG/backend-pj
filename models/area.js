const { Model, DataTypes } = require("sequelize");
const sequelize = require('../database/database');
const General = require("./general");


class Area extends Model{}

Area.init({
    nombre:{
        type:DataTypes.STRING
    },
    sigla:{
        type:DataTypes.CHAR
    }
},{
    sequelize,
    timestamps:false,
    tableName:'area'
});

Area.hasMany(General,{
    as:'FK_GeneralArea',
    foreignKey:'id_area'
});

General.belongsTo(Area,{
    sourcekey:'id',
    foreignKey:'id_area'
})

module.exports = Area;