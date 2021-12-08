const { Validator, ValidationError } = require("express-json-validator-middleware");
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admin:javamongo@cluster0.5qkke.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const express = require("express");
const router = express.Router();
const inv = require('../Procesador de eventos/invernadero');
const lec = require('../Procesador de eventos/lectura');
const gestionarInvernaderos = require("../Procesador de eventos/gestionarInvernaderos");
let gestorInvernaderos = new gestionarInvernaderos();

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const lecturaSchema = {
    type: "object",
    required: ["id", "gradoTemperatura", "indiceHumedad", "fechaLectura"],
    properties: {
        id: {
            type: "number",
        },
        
        gradoTemperatura: {
            type: "string",
        },
        indiceHumedad: {
            type: "string",
        },
        fechaLectura: {
            type: "string",
        }
    },
};

const { validate } = new Validator();
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
client.connect(async function (err, db) {

    router.get("/invernaderos", async (req, res, next) => {
        try {
            //Busca en JSON
            let invernaderos = await gestorInvernaderos.listarInvernaderos(db);

            if (invernaderos.length === 0) {

                let mensaje = "No hay invernaderos!";

                res.status(206).send(mensaje);
            } else {

                res.status(200).send(invernaderos);
            }
        } catch (err) {
            next(err)
        }
    });

    router.get("/invernadero/:id", async (req, res, next) => {
        try {
            var id = req.params.id;
            let invernadero = await gestorInvernaderos.listarInvernaderoPorId(db, id);


            if (invernadero.length === 0) {

                mensaje = "invernadero no encontrada!"

                res.status(206).send(mensaje);
            } else {

                res.status(200).send(invernadero);
            }
        } catch (err) {
            next(err)
        }
    });

    router.post("/invernadero", async (req, res, next) => {
        try {
            const data = req.body;
            //console.log(req.body);
            //Se crea el concursante
            let Lectura = new lec();
            let invernadero = new inv();

            //Se asignan los valores a partir del body
            Lectura._id = getRandomInt(100000000000)
            invernadero._id = 1;
            Lectura.gradodeTemperatura = parseInt(data.gradoTemperatura)
            Lectura.indicedeHumedad = parseInt(data.indiceHumedad) 
            Lectura.fechaLectura = data.fechaLectura;
            invernadero.lecturas = []

            //Almacena en Json
            info = await gestorInvernaderos.agregarLecturaInvernadero(db, invernadero._id, Lectura, Lectura._id);
            console.log(info);

            //Se verifica si se agrego la lectura
            if (info === "Una lectura ya tiene esa id!") {
                res.status(200).send(info);
            } else {
                if (info === "El numero ya esta tomado!") {
                    res.status(200).send(info);
                } else {
                    if (info.modifiedCount > 0) {
                        mensaje = "Lectura agregado!"
                        res.status(201).send(mensaje);
                    } else {

                        mensaje = 'lectura no agregada!'

                        res.status(202).send(mensaje);
                    }
                }
            }
        } catch (err) {
            next(err)
        }
    });
});
client.close();
module.exports = router