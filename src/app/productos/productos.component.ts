import { Component, OnInit } from "@angular/core";
import { Producto } from "../models/producto.model";
import { ProductoService } from "../services/productos.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-productos",
  templateUrl: "./productos.component.html",
  styleUrls: ["./productos.component.css"]
})
export class ProductosComponent implements OnInit {
  productos: Producto[] = [];
  info: boolean = false;
  ordenarOption:string;
  opciones = ["Alfabetico","Pais","Valoraciones","Precio"];
  constructor(
    private productosService: ProductoService,
    private router: Router
  ) {}
  ngOnInit() {
    this.productos = this.productosService.productos;
  }
  ngDoCheck() {
    if (Object.keys(this.productos).length === 0) {
      this.info = true;
    } else {
      this.info = false;
    }
  }
  agregar() {
    this.router.navigate(["productos/agregar"]);
  }
  ordenarProductos(){
    this.productosService.ordernarProducto(this.ordenarOption);
  }
}
