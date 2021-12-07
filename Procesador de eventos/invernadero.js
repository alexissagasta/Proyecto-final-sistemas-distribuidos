//invernadero.js

class Invernadero {
    
    constructor(_id, lecturas) {
        this._id = _id;
        this.lecturas = lecturas;
    };


    //sobreescribiendo un método
    get_id() {
        return this._id;
    };

    getLecturas() {
        return this.lecturas;
    };
    

    set_id(id) {
        this._id = id;
    };

    /**
     * @param {Array} lecs
     */
    setLecturas(lecs) {
        this.lecturas = lecs;
    };

}
module.exports = Invernadero