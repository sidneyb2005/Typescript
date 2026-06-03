export default class Cl_sSolicitud {
    static apiUrl = "https://6a108664d2a985707036e6c3.mockapi.io/Proyectos/impresiones";
    static async guardarRegistro(nuevaSolicitud) {
        try {
            const respuesta = await fetch(this.apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(nuevaSolicitud.toJSON()),
            });
            if (!respuesta.ok) {
                return { ok: false, mensaje: "Error al guardar la solicitud" };
            }
            const data = await respuesta.json();
            return { ok: true, mensaje: "Solicitud de impresión guardada con éxito. ID: " + data.id };
        }
        catch (error) {
            return {
                ok: false,
                mensaje: "Error al guardar el registro: " + error.message,
            };
        }
    }
    static async existeSolicitud(cedula) {
        try {
            const respuesta = await fetch(`${this.apiUrl}?cedula=${cedula}`);
            if (respuesta.status === 404) {
                return { ok: true, existe: false };
            }
            if (!respuesta.ok) {
                return { ok: false, existe: false };
            }
            const data = await respuesta.json();
            return { ok: true, existe: data.length > 0 };
        }
        catch (error) {
            return { ok: false, existe: false };
        }
    }
}
//# sourceMappingURL=Cl_sSolicitud.js.map