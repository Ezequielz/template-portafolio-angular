import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductoDescripcion } from 'src/app/interfaces/producto-descripcion.interface';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: IProductoDescripcion = {};
  id: string= '';

  constructor( private route: ActivatedRoute,
                public productoService: ProductosService ) { }

  ngOnInit(): void {

    this.route.params
        .subscribe( parametros => {
          // console.log( parametros['id'] )

          this.productoService.getProducto(parametros['id'])
              .subscribe( (producto: IProductoDescripcion) => {
                this.id = parametros['id']
              
                this.producto = producto
                // console.log(producto)
              })

        })

  }

}
