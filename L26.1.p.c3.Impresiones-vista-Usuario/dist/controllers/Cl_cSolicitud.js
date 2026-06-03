import Cl_mSolicitud from "../models/Cl_mSolicitud.js";
import Cl_sSolicitud from "../services/Cl_sSolicitud.js";
export default class Cl_cSolicitud {
    vista;
    constructor(vista) {
        this.vista = vista;
        this.vista.onEnviar(() => this.btEnviarOnClick());
    }
    async btEnviarOnClick() {
        // Validación básica para evitar envíos vacíos
        if (this.vista.cedula === 0 || this.vista.nombre === "" || this.vista.documento === "" || this.vista.copias === 0 || this.vista.referencia === "") {
            alert("Por favor, complete todos los campos de la solicitud.");
            return;
        }
        let resultado = new Cl_mSolicitud({
            cedula: this.vista.cedula,
            nombre: this.vista.nombre,
            documento: this.vista.documento,
            copias: this.vista.copias,
            referencia: this.vista.referencia,
        });
        // Validamos que el usuario no tenga ya un documento enviando (Regla de negocio)
        let chkExiste = await Cl_sSolicitud.existeSolicitud(resultado.cedula);
        if (chkExiste.ok === false) {
            alert("Error: No se pudo conectar con el servidor.");
            return;
        }
        if (chkExiste.existe) {
            alert("Ya tienes un documento pendiente de impresión. Solo se permite un documento por vez.");
            return;
        }
        // Guardamos si pasó todas las validaciones
        Cl_sSolicitud.guardarRegistro(resultado).then((resultado) => {
            alert(resultado.mensaje);
        });
    }
}
//# sourceMappingURL=Cl_cSolicitud.js.map