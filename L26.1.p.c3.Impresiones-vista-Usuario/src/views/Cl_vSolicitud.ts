import { I_vSolicitud } from "../interfaces/I_vSolicitud.js";

export default class Cl_vSolicitud implements I_vSolicitud {
  vista: HTMLElement | null;
  inCedula: HTMLInputElement;
  inNombre: HTMLInputElement;
  inDocumento: HTMLInputElement;
  inCopias: HTMLInputElement;
  inReferencia: HTMLInputElement;
  btEnviar: HTMLButtonElement;

  constructor() {
    this.vista = document.getElementById("solicitud") as HTMLElement;
    this.inCedula = document.getElementById("solicitud_inCedula") as HTMLInputElement;
    this.inNombre = document.getElementById("solicitud_inNombre") as HTMLInputElement;
    this.inDocumento = document.getElementById("solicitud_inDocumento") as HTMLInputElement;
    this.inCopias = document.getElementById("solicitud_inCopias") as HTMLInputElement;
    this.inReferencia = document.getElementById("solicitud_inReferencia") as HTMLInputElement;
    this.btEnviar = document.getElementById("solicitud_btEnviar") as HTMLButtonElement;
  }

  onEnviar(callback: () => void): void {
    this.btEnviar.onclick = callback;
  }

  get cedula(): number {
    return parseInt(this.inCedula.value.trim()) || 0;
  }

  get nombre(): string {
    return this.inNombre.value.trim();
  }

  get documento(): string {
    return this.inDocumento.value.trim();
  }

  get copias(): number {
    return parseInt(this.inCopias.value.trim()) || 0;
  }

  get referencia(): string {
    return this.inReferencia.value.trim();
  }
}