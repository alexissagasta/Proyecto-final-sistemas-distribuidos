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
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
const testDate = new Date(Date.now());
async function main() {
    client.connect(async function (err, db) {
        let invernadero = new inv();
        invernadero._id = 1
        invernadero.lecturas = []

        let lectura = new lec();
        lectura._id = getRandomInt(10000)
        lectura.gradodeTemperatura = getRandomInt(10000)
        lectura.indicedeHumedad = getRandomInt(10000)
        //lectura.fechaLectura = testDate[Symbol.toPrimitive]('string');
        lectura.fechaLectura = getRandomInt(10000).toString()
        console.log(lectura);

        //await gestorRifas.registrarInvernadero(db, invernadero)
        //await gestorRifas.agregarLecturaInvernadero(db, 1, lectura, lectura._id)
        await gestorRifas.listarInvernaderos(db)

    })

}
client.close();
main()
