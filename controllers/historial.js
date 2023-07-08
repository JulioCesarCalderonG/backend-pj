const { request, response } = require("express");
const Historial = require("../models/historial");


const mostrarHistorial = async(req = request, res = response) =>{
    try {
        const { id } = req.params;
        const resp = await Historial.findAll({
            where:{
                id_administrador: id,
            }
        });
        res.json({
            ok:true,
            msg: 'Se muestran los datos con exito',
            resp,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`,
        });
    }
};


const mostrarIdHistorial = async(req = request, res = response) =>{
    try {
        const { id } = req.params;
        const resp = await Historial.findOne({
            where:{
                id,
            }
        });
        res.json({
            ok:true,
            msg: 'Se muestran los datos correctamente',
            resp,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: `Error: ${error}`,
        });
    }
};

module.exports = {
    mostrarHistorial,
    mostrarIdHistorial,
};

