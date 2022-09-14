import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProducto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {


  productos: IProducto[] = []
  cargando = true
  productosFiltrados: IProducto[] = []

  constructor( private http: HttpClient ) {

    this.cargarProductos();
   }


  private cargarProductos() {


    return new Promise<void>( (resolve,reject) => {


      this.http.get('https://angular-html-f1bd0-default-rtdb.firebaseio.com/productos_idx.json')
          .subscribe( (resp: any) => {
            
            this.productos = resp
            // console.log(resp)
            this.cargando = false
            resolve();
          });
    })

  }


  getProducto( id: string ){

   return this.http.get(`https://angular-html-f1bd0-default-rtdb.firebaseio.com/productos/${ id }.json`)

  }

  buscarProducto( termino: string ) {

    if ( this.productos.length === 0 ) {
      //cargar productos
      this.cargarProductos().then( ()=> {
        // ejecutar dfesp de tener los productos
        //aplicar filtro
        this.filtrarProductos( termino )
      })
    }else{
      // aplicar filtros
      this.filtrarProductos( termino )
    }


  }


  private filtrarProductos( termino: string ) {

    this.productosFiltrados = []
    // console.log(this.productos)
    termino = termino.toLowerCase();
    this.productos.forEach( prod => {

        const tituloLower = prod.titulo.toLowerCase()

      if( prod.categoria.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
        this.productosFiltrados.push(prod);
      }

    })

  }

}
