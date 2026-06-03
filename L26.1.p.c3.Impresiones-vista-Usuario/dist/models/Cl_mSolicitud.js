export default class Cl_mSolicitud {
    _cedula = 0;
    _nombre = "";
    _documento = "";
    _copias = 0;
    _referencia = "";
    _estado = "Verificando pago";
    constructor({ cedula, nombre, documento, copias, referencia, estado = "Verificando pago" }) {
        this.cedula = cedula;
        this.nombre = nombre;
        this.documento = documento;
        this.copias = copias;
        this.referencia = referencia;
        this.estado = estado;
    }
    get cedula() {
        return this._cedula;
    }
    set cedula(value) {
        this._cedula = value;
    }
    get nombre() {
        return this._nombre;
    }
    set nombre(value) {
        this._nombre = value;
    }
    get documento() {
        return this._documento;
    }
    set documento(value) {
        this._documento = value;
    }
    get copias() {
        return this._copias;
    }
    set copias(value) {
        this._copias = value;
    }
    get referencia() {
        return this._referencia;
    }
    set referencia(value) {
        this._referencia = value;
    }
    get estado() {
        return this._estado;
    }
    set estado(value) {
        this._estado = value;
    }
    toJSON() {
        return {
            cedula: this.cedula,
            nombre: this.nombre,
            documento: this.documento,
            copias: this.copias,
            referencia: this.referencia,
            estado: this.estado,
        };
    }
}
//# sourceMappingURL=Cl_mSolicitud.js.map