import I_vImpresiones from "../interfaces/I_vImpresiones.js";
import Cl_mSolicitud from "../models/Cl_mSolicitud.js";

export default class Cl_vImpresiones implements I_vImpresiones {
  vista: HTMLElement;
  lblTotalCopias: HTMLElement;
  lblTotalIngresos: HTMLElement;
  btRecargar: HTMLButtonElement;
  chkSoloDisponibles: HTMLInputElement;
  tblRegistros: HTMLTableSectionElement;
  
  private _onCambiarEstadoCallback: ((id: string, nuevoEstado: string) => void) | null = null;

  constructor() {
    this.vista = document.getElementById("personal") as HTMLElement;
    this.lblTotalCopias = document.getElementById("personal_lblTotalCopias") as HTMLElement;
    this.lblTotalIngresos = document.getElementById("personal_lblTotalIngresos") as HTMLElement;
    this.btRecargar = document.getElementById("personal_btRecargar") as HTMLButtonElement;
    this.chkSoloDisponibles = document.getElementById("personal_chkSoloDisponibles") as HTMLInputElement;
    this.tblRegistros = document.getElementById("personal_tblRegistros") as HTMLTableSectionElement;
  }

  get soloDisponibles(): boolean {
    return this.chkSoloDisponibles.checked;
  }

  onRecargar(callback: () => void): void {
    this.btRecargar.onclick = callback;
  }

   onChangeSoloDisponibles(callback: () => void): void {
    this.chkSoloDisponibles.onchange = callback;
  }

  onAccionCambiarEstado(callback: (id: string, nuevoEstado: string) => void): void {
    this._onCambiarEstadoCallback = callback;
  }

  mostrarEstadisticas(totalCopias: number, totalIngresos: number): void {
    this.lblTotalCopias.innerText = totalCopias.toString();
    this.lblTotalIngresos.innerText = totalIngresos.toString();
  }

  mostrarImpresiones(solicitudesPlanas: any[]): void {
    this.tblRegistros.innerHTML = "";

    solicitudesPlanas.forEach((sol) => {
      const fila = document.createElement("tr");

      // Si el estado es "Verificando pago", mostramos los botones de acción para el personal
      let columnaAccion = "";
      if (sol.estado === "Verificando pago") {
        columnaAccion = `
          <button class="btn-aprobar" data-id="${sol.id}" style="background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb; cursor: pointer; margin-right: 5px;">Aprobar</button>
          <button class="btn-rechazar" data-id="${sol.id}" style="background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; cursor: pointer;">Rechazar</button>
        `;
      } else {
        columnaAccion = `<span style="color: #6c757d; font-size: 13px; font-style: italic;">Procesado</span>`;
      }

      // Estilos de color para identificar estados rápidamente
      let colorEstado = "orange";
      if (sol.estado === "Aprobado") colorEstado = "green";
      if (sol.estado === "Rechazado") colorEstado = "red";

      fila.innerHTML = `
        <td>${sol.cedula}</td>
        <td>${sol.nombre}</td>
        <td>${sol.documento}</td>
        <td>${sol.copias}</td>
        <td>${sol.referencia}</td>
        <td>${sol.tarifaTotal} Bs.</td>
        <td style="font-weight: bold; color: ${colorEstado};">${sol.estado}</td>
        <td style="padding: 5px;">${columnaAccion}</td>
      `;

      this.tblRegistros.appendChild(fila);
    });

    this.tblRegistros.querySelectorAll(".btn-aprobar").forEach((btn) => {
      (btn as HTMLButtonElement).onclick = () => {
        const id = btn.getAttribute("data-id");
        if (id && this._onCambiarEstadoCallback) {
          this._onCambiarEstadoCallback(id, "Aprobado");
        }
      };
    });

    this.tblRegistros.querySelectorAll(".btn-rechazar").forEach((btn) => {
      (btn as HTMLButtonElement).onclick = () => {
        const id = btn.getAttribute("data-id");
        if (id && this._onCambiarEstadoCallback) {
          this._onCambiarEstadoCallback(id, "Rechazado");
        }
      };
    });
  }
}