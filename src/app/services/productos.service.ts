import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProducto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {


  productos: IProducto[] = []
  cargando = true

  constructor( private http: HttpClient ) {

    this.cargarProductos();
   }


  private cargarProductos() {
    this.http.get('https://angular-html-f1bd0-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe( (resp: any) => {
          
          this.productos = resp
          console.log(resp)
            this.cargando = false
        });
  }
}
