export default interface I_vImpresiones {
  get soloDisponibles(): boolean;
  
  mostrarImpresiones(solicitudesPlanas: any[]): void;
  mostrarEstadisticas(totalCopias: number, totalIngresos: number): void;
  
  onRecargar(callback: () => void): void;
  onChangeSoloDisponibles(callback: () => void): void;
  onAccionCambiarEstado(callback: (id: string, nuevoEstado: string) => void): void;
}