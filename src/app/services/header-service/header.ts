import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  // Agrega esta línea:
  accesoHeader = 'servicio header corriendo..';

  constructor() { }
}