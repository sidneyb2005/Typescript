export interface I_vSolicitud {
  get cedula(): number;
  get nombre(): string;
  get documento(): string;
  get copias(): number;
  get referencia(): string;

  onEnviar(callback: () => void): void;
  }