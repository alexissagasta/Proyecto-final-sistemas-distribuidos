const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://admin:javamongo@cluster0.5qkke.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const inv = require('./Procesador de eventos/invernadero');
const lec = require('./Procesador de eventos/lectura');
const gInv = require('./Procesador de eventos/gestionarInvernaderos');
let gestorRifas = new gInv();

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function main() {
    client.connect(async function (err, db) {
        let invernadero = new inv();
        invernadero._id = 1
        invernadero.lecturas = []

        let lectura = new lec();
        lectura._id = Math.random()
        lectura.GradodeTemperatura = 123
        lectura.IndicedeHumedad = 12
        lectura.fechaLectura = Date.now()

        console.log(lectura);

        //await gestorRifas.registrarInvernadero(db, invernadero)
        await gestorRifas.agregarLecturaInvernadero(db, 1, lectura, lectura._id)
        await gestorRifas.listarInvernaderos(db)

    })

}
client.close();
main()
