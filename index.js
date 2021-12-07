//index.js
//const ruteadorInvernaderos = require("./Manejador-de-eventos/routerInvernaderos.js");
const express = require("express");
var fs = require("fs");
var morgan = require('morgan');
var path = require("path");
const app = express();

async function main() {
    // Crea un archivo en el directorio actual
    var accessLogStream =
        fs.createWriteStream(path.join(__dirname, 'access.log'), {
            flags: 'a'
        })

    app.use(express.json());
    app.use(express.static("./public"));
    app.use(morgan('combined', { stream: accessLogStream }))
   // app.use("/", ruteadorInvernaderos);

    app.get("/", (req, res) => {
        res.sendFile(__dirname + "/aplicacionWeb/index.html");
    });

    app.get("/aplicacionWeb/estilos", (req, res) => {
        res.sendFile(__dirname + "/aplicacionWeb/estilos.css");       
    });

    app.get("/aplicacionWeb/card", (req, res) => {
        res.sendFile(__dirname + "/aplicacionWeb/card.png");       
    });

    app.use(function (err, req, res, next) {
        console.log(err);
        res.send('Ocurrio un error interno!');
    })

    app.listen(3000, (err) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log("El servidor se esta ejecutando en el puerto 3000");
    });

}

main();