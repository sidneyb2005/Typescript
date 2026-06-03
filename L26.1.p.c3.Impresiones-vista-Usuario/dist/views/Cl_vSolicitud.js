export default class Cl_vSolicitud {
    vista;
    inCedula;
    inNombre;
    inDocumento;
    inCopias;
    inReferencia;
    btEnviar;
    constructor() {
        this.vista = document.getElementById("solicitud");
        this.inCedula = document.getElementById("solicitud_inCedula");
        this.inNombre = document.getElementById("solicitud_inNombre");
        this.inDocumento = document.getElementById("solicitud_inDocumento");
        this.inCopias = document.getElementById("solicitud_inCopias");
        this.inReferencia = document.getElementById("solicitud_inReferencia");
        this.btEnviar = document.getElementById("solicitud_btEnviar");
    }
    onEnviar(callback) {
        this.btEnviar.onclick = callback;
    }
    get cedula() {
        return parseInt(this.inCedula.value.trim()) || 0;
    }
    get nombre() {
        return this.inNombre.value.trim();
    }
    get documento() {
        return this.inDocumento.value.trim();
    }
    get copias() {
        return parseInt(this.inCopias.value.trim()) || 0;
    }
    get referencia() {
        return this.inReferencia.value.trim();
    }
}
//# sourceMappingURL=Cl_vSolicitud.js.map