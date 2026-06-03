import Cl_mImpresiones from "../models/Cl_mImpresiones.js";
import I_vPersonal from "../interfaces/I_vImpresiones.js";
import Cl_sSolicitud from "../services/Cl_sSolicitud.js";

export default class Cl_cPersonal {
  private modelo: Cl_mImpresiones;
  private vista: I_vPersonal;

  constructor(modelo: Cl_mImpresiones, vista: I_vPersonal) {
    this.modelo = modelo;
    this.vista = vista;

    // Vinculación de eventos de la interfaz
    this.vista.onRecargar(() => this.cargarDatos());
    this.vista.onChangeSoloDisponibles(() => this.actualizarVista());
    this.vista.onAccionCambiarEstado((id, nuevoEstado) => this.cambiarEstadoSolicitud(id, nuevoEstado));

    // Carga inicial automatizada al abrir el panel
    this.cargarDatos();
  }

  async cargarDatos() {
    let resultado = await Cl_sSolicitud.getSolicitudes();
    
    if (resultado.ok === false) {
      alert("Error: No se pudo obtener la información de MockAPI.");
      return;
    }

    this.modelo.setSolicitudes(resultado.tabla);
    this.actualizarVista();
  }

  actualizarVista() {
    
    let solicitudesFiltradas = this.modelo.getFiltrados(this.vista.soloDisponibles);

    
    let datosPlanos = solicitudesFiltradas.map((reg) => ({
      id: reg.id,
      cedula: reg.modelo.cedula,
      nombre: reg.modelo.nombre,
      documento: reg.modelo.documento,
      copias: reg.modelo.copias,
      referencia: reg.modelo.referencia,
      estado: reg.modelo.estado,
      tarifaTotal: reg.modelo.tarifaTotal()
      
    }));

    this.vista.mostrarImpresiones(datosPlanos);
    this.vista.mostrarEstadisticas(
      this.modelo.calcularTotalCopias(),
      this.modelo.calcularTotalIngresos()
    );
  }

  async cambiarEstadoSolicitud(id: string, nuevoEstado: string) {
    let confirmacion = confirm(`¿Está seguro de cambiar el estado de esta solicitud a "${nuevoEstado}"?`);
    if (!confirmacion) return;

    let resultado = await Cl_sSolicitud.cambiarEstado(id, nuevoEstado);
    alert(resultado.mensaje);

    if (resultado.ok) {
      this.cargarDatos();
    }
  }
}