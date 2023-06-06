const { request, response } = require("express");
const fs = require('fs');
const path= require('path');
const pdf = require('pdf-creator-node');
const { Organo, Personal, Cargo, General, UnidadOrganica, Area } = require("../models");
const { Op } = require("sequelize");
const postRecordLaboral =async(req=request,res=response)=>{
    try {
        const {tipofiltro,tipodependencia,dependencia,personal, fechainicio, fechafin} = req.body;


        
        const html = fs.readFileSync(path.join(__dirname,'../pdf/html/relacionpersonal.html'),'utf-8');
        const filename = Math.random()+'_doc'+'.pdf';
        let array = [];
        
        const options = {
            format: "A3",
            orientation: "landscape",
            border: "10mm",
            header: {
                height: "0mm",
                contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
            },
            footer: {
                height: "28mm",
                contents: {
                    first: 'Cover page',
                    2: 'Second page', // Any page number is working. 1-based index
                    default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                    last: 'Last Page'
                }
            }
        }

        if (tipofiltro==="1") {
            switch (tipodependencia) {
                case '1':
                    const organo = await Organo.findOne({
                        where:{
                            id:dependencia   
                        }
                    })
                    const resp = await General.findAll({
                        where:{
                            [Op.and]:[
                                {
                                    dependencia:organo.nombre,
                                },
                                {
                                    
                                    inicio:{
                                        [Op.gte]:fechainicio
                                    }
                                },{
                                    fin:{
                                        [Op.lte]:fechafin
                                    }
                                }
                            ]
                        },
                        include:[
                            {
                                model:Personal
                            },
                            {
                                model:Cargo
                            }
                        ]
                    });
                    resp.forEach(d => {
                        let i = 1;
                        const prod = {
                            id: `${i}`,
                            documento: d.codigo_documento,
                            personal:`${d.Personal.nombre} ${d.Personal.apellido}`,
                            dependencia: d.dependencia,
                            cargo: `${d.Cargo.descripcion}`,
                            desde: d.inicio,
                            hasta: d.fin,
                        }
                        i++;
                        array.push(prod);
                    });
                    break;
                case '2':
                    const unidad = await UnidadOrganica.findOne({
                        where:{
                            id:dependencia   
                        }
                    })
                    const resp2 = await General.findAll({
                        where:{
                            [Op.and]:[
                                {
                                    dependencia:unidad.nombre,
                                },
                                {
                                    
                                    inicio:{
                                        [Op.gte]:fechainicio
                                    }
                                },{
                                    fin:{
                                        [Op.lte]:fechafin
                                    }
                                }
                            ]
                        },
                        include:[
                            {
                                model:Personal
                            },
                            {
                                model:Cargo
                            }
                        ]
                    });
                    console.log(resp2);
                    resp2.forEach(d => {
                        const i = 1;
                        const prod = {
                            id: i++,
                            documento: d.codigo_documento,
                            personal:``,
                            dependencia: d.dependencia,
                            cargo: '',
                            desde: d.inicio,
                            hasta: d.fin,
                        }
                        array.push(prod);
                    });
                    break;
                case '3':
                    const area = await Area.findOne({
                        where:{
                            id:dependencia   
                        }
                    })
                    const resp3 = await General.findAll({
                        where:{
                            [Op.and]:[
                                {
                                    dependencia:area.nombre,
                                },
                                {
                                    
                                    inicio:{
                                        [Op.gte]:fechainicio
                                    }
                                },{
                                    fin:{
                                        [Op.lte]:fechafin
                                    }
                                }
                            ]
                        },
                        include:[
                            {
                                model:Personal
                            },
                            {
                                model:Cargo
                            }
                        ]
                    });
                    console.log(resp3);
                    resp3.forEach(d => {
                        const i = 1;
                        const prod = {
                            id: i++,
                            documento: d.codigo_documento,
                            personal:``,
                            dependencia: d.dependencia,
                            cargo: '',
                            desde: d.inicio,
                            hasta: d.fin,
                        }
                        array.push(prod);
                    });
                    break;
                default:
                    break;
            }
        }else{
            const resp = await General.findAll({
                where:{
                    id_personal:personal
                },
                include:[
                    {
                        model:Personal
                    },
                    {
                        model:Cargo
                    }
                ]
            });
        }

        

        /* let subtotal = 0;
        array.forEach(i => {
            subtotal += i.total
        });
        const tax = (subtotal * 20) / 100;
        const grandtotal = subtotal - tax; */
        console.log(array);
        const obj = {
            prodlist: array,
            subtotal: '',
            tax: '',
            gtotal: ''
        }
        const document = {
            html: html,
            data: {
                products: obj
            },
            path: './pdf/reportes/' + filename
        }
        pdf.create(document, options)
            .then(res => {
                console.log(res);
            }).catch(error => {
                console.log(error);
            });

            res.json({
                ok:true,
                array
            })
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:`Error: ${error}`
        })
    }
}



module.exports = {
    postRecordLaboral
}