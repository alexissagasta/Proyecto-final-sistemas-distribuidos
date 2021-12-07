//lectura.js

class Lectura {
    
    constructor(_id, gradodeTemperatura, indicedeHumedad, fechaLectura) {
        this._id = _id;
        this.gradodeTemperatura = gradodeTemperatura;
        this.indicedeHumedad = indicedeHumedad;
        this.fechaLectura = fechaLectura;
    };


    //sobreescribiendo un método
    get_id() {
        return this._id;
    };
    getGradodeTemperatura() {
        return this.gradodeTemperatura;
    };
    getIndicedeHumedad() {
        return this.indicedeHumedad;
    };
    getFechaLectura() {
        return this.fechaLectura;
    };

    set_id(id) {
        this._id = id;
    };
    /**
     * @param {int} gt
     */
    setGradodeTemperatura(gt) {
        this.gradodeTemperatura = gt;
    };
    /**
     * @param {int} ih
     */
    setIndicedeHumedad(ih) {
        this.indicedeHumedad = ih;
    };
    /**
     * @param {Date} fl
     */
    setFechaLectura(fl) {
        this.fechaLectura = fl;
    };
    


}
module.exports = Lectura