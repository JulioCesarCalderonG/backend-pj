const { request, response } = require("express");
const fs = require('fs');
const path= require('path');
const pdf = require('pdf-creator-node');
const data = require('../api/data');
const { Organo, Personal, Cargo, General } = require("../models");
const { Op } = require("sequelize");
const postRecordLaboral =async(req=request,res=response)=>{
    try {
        const {tipofiltro,tipodependencia,dependencia,buscar, fechainicio, fechafin} = req.body;


        
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
                    console.log(resp);
                    break;
                case '2':
                    
                    break;
                case '3':
                    
                    break;
                default:
                    break;
            }
        }else{

        }

        data.forEach(d => {
            const prod = {
                name: d.name,
                description: d.description,
                unit: d.unit,
                quantity: d.quantity,
                price: d.price,
                total: d.quantity * d.price,
                imgurl: d.imgurl
            }
            array.push(prod);
        });

        let subtotal = 0;
        array.forEach(i => {
            subtotal += i.total
        });
        const tax = (subtotal * 20) / 100;
        const grandtotal = subtotal - tax;
        const obj = {
            prodlist: array,
            subtotal: subtotal,
            tax: tax,
            gtotal: grandtotal
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
                ok:true
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