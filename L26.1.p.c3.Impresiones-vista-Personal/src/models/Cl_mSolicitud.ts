export default class Cl_mSolicitud {
  private _cedula: number = 0;
  private _nombre: string = "";
  private _documento: string = "";
  private _copias: number = 0;
  private _referencia: string = "";
 private _estado:
    | "Verificando pago"
    | "Esperando documento"
    | "Imprimiendo"
    | "Disponible" = "Verificando pago";

  constructor({cedula, nombre, documento, copias, referencia, estado = "Verificando pago" }: {
    id?:string
    cedula: number;
    nombre: string;
    documento: string;
    copias: number;
    referencia: string;
    estado?: "Verificando pago" | "Esperando documento" | "Imprimiendo" | "Disponible";

  }) {
  
    this.cedula = cedula;
    this.nombre = nombre;
    this.documento = documento;
    this.copias = copias;
    this.referencia = referencia;
    this.estado = estado;
  }
 

  public get cedula(): number {
    return this._cedula;
  }

  public set cedula(value: number) {
    this._cedula = value;
  }

  public get nombre(): string {
    return this._nombre;
  }

  public set nombre(value: string) {
    this._nombre = value;
  }

  public get documento(): string {
    return this._documento;
  }

  public set documento(value: string) {
    this._documento = value;
  }

  public get copias(): number {
    return this._copias;
  }

  public set copias(value: number) {
    this._copias = value;
  }

  public get referencia(): string {
    return this._referencia;
  }

  public set referencia(value: string) {
    this._referencia = value;
  }

   public get estado():
    | "Verificando pago"
    | "Esperando documento"
    | "Imprimiendo"
    | "Disponible" {
    return this._estado;
  }

  public set estado(
    value:
      | "Verificando pago"
      | "Esperando documento"
      | "Imprimiendo"
      | "Disponible",
  ) {
      this._estado = value;
  }

  tarifaTotal(): number {
    return this.copias * 5;
  }

 isDisponible(): boolean {
    return this.estado === "Disponible";
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