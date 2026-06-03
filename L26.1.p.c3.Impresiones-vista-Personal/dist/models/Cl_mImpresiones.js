import Cl_mSolicitud from "./Cl_mSolicitud.js";
export default class Cl_mImpresiones {
    _registros = [];
    setSolicitudes(array) {
        this._registros = [];
        array.forEach((item) => {
            const modeloSolicitud = new Cl_mSolicitud({
                cedula: +item.cedula,
                nombre: item.nombre,
                documento: item.documento,
                copias: +item.copias,
                referencia: item.referencia,
                estado: item.estado,
            });
            this._registros.push({
                id: item.id,
                modelo: modeloSolicitud,
            });
        });
    }
    calcularTotalCopias() {
        return this._registros.reduce((acc, reg) => acc + reg.modelo.copias, 0);
    }
    calcularTotalIngresos() {
        // Tarifa fijada de 5 Bs por cada copia
        return this.calcularTotalCopias() * 5;
    }
    get registros() {
        return this._registros;
    }
    // Regla de filtrado solicitada
    getFiltrados(isDisponible) {
        if (isDisponible) {
            return this._registros.filter(reg => reg.modelo.estado === "Disponible");
        }
        return this._registros;
    }
}
//# sourceMappingURL=Cl_mImpresiones.js.map