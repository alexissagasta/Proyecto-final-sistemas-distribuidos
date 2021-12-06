//gestionarInvernaderos.js
class gestionarInvernaderos {

    registrarInvernadero = async (db, invernadero) => {
        try {
            var dbo = db.db("Invernaderos");
            const res = await dbo.collection("invernadero").insertOne(invernadero);
            console.log("Un invernadero ha sido agregado");
            console.log({ invernadero: res });
            return res;

        } catch (e) {
            console.error(e);
        }

    }

    borrarInvernaderoPorId = async (db, id) => {
        try {
            var dbo = db.db("Invernaderos");
            var myquery = { "_id": id };
            const res = await dbo.collection("invernadero").deleteOne(myquery);
            console.log("Un invernadero ha sido eliminado");
            console.log({ rifa: res });
            return res;

        } catch (e) {
            console.error(e);
        }

    }

    actualizarInvernaderoPorId = async (db, id, premio, cantNum, organizador) => {
        try {
            var dbo = db.db("Invernaderos");
            var myquery = { "_id": id };
            var newvalues = { $set: { premio: premio, cantNumeros: cantNum, organizador: organizador } };
            const res = await dbo.collection("invernadero").updateOne(myquery, newvalues);
            console.log("Un invernadero ha sido actualizado");
            console.log({ rifa: res });
            return res;

        } catch (e) {
            console.error(e);
        }

    }

    listarInvernaderos = async (db) => {

        try {
            // specify the DB's name
            var dbo = db.db("Invernaderos");
            // execute find query
            const items = await dbo.collection('invernadero').find({}).toArray();
            console.log(items);
            return items;
        } catch (e) {
            console.error(e);
        }

    }

    listarInvernaderoPorId = async (client, id) => {
        try {
            // specify the DB's name
            const db = client.db('Invernaderos');
            // execute find query
            const items = await db.collection('invernadero').find({ "_id": id }).toArray();
            console.log(items);
            return items;
        } catch (e) {
            console.error(e);
        }

    }

    
}

module.exports = gestionarInvernaderos