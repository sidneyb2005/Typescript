
import Cl_mSolicitud from "./Cl_mSolicitud.js";

// Interfaz auxiliar para resguardar el ID autogenerado por MockAPI junto a su modelo
export interface ISolicitudRegistro {
  id: string;
  modelo: Cl_mSolicitud;
}

export default class Cl_mImpresiones {
  private _registros: ISolicitudRegistro[] = [];

  public setSolicitudes(array: any[]): void {
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

  public calcularTotalCopias(): number {
    return this._registros.reduce((acc, reg) => acc + reg.modelo.copias, 0);
  }

  public calcularTotalIngresos(): number {
    // Tarifa fijada de 5 Bs por cada copia
    return this.calcularTotalCopias() * 5;
  }

  public get registros(): ISolicitudRegistro[] {
    return this._registros;
  }

  // Regla de filtrado solicitada
  public getFiltrados(isDisponible: boolean): ISolicitudRegistro[] {
    if (isDisponible) {
      return this._registros.filter(reg => reg.modelo.estado === "Disponible");
    }
    return this._registros;
  }

}

