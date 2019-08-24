import { Producto } from "../models/producto.model";
import { Injectable } from "@angular/core";
//@Injectable para usar un servicio dentro de otro servicio

export class ProductoService {
  productos: Producto[] = [
    new Producto("Barranquilla", "Skate", "COL", 3000, 0, 150),
    new Producto("Bogota", "Nintendo Wii", "COL", 13000, 0, 122),
    new Producto("Lima", "Gorra", "PER", 2000, 0, 9)
  ];
  valoraciones = [];

  agregarProducto(producto: Producto) {
    this.productos.push(producto);
  }
  getProducto(index: number) {
    const producto: Producto = this.productos[index];
    return producto;
  }
  editProducto(index: number, producto: Producto) {
    const productoEdit = this.productos[index];
    productoEdit.ciudad = producto.ciudad;
    productoEdit.producto = producto.producto;
    productoEdit.pais = producto.pais;
    productoEdit.precio = producto.precio;
  }
  removeProducto(index: number) {
    this.productos.splice(index, 1);
  }
  valorarProducto(index: number, valoracion: number) {
    const producto: Producto = this.productos[index];
    this.valoraciones.push(valoracion);
    let cantidad: number = 0;
    for (let i = 0; i < this.valoraciones.length; i++) {
      cantidad = cantidad + parseInt(this.valoraciones[i]);
    }
    console.log(this.valoraciones.length);
    console.log(cantidad);
    const prom = cantidad / this.valoraciones.length;
    producto.valoracion = prom;
    return prom;
  }
  ordernarProducto(tipo: string) {
    if (tipo == "Alfabetico") {
      this.productos.sort(function(a, b) {
        if (a.producto > b.producto) {
          return 1;
        }
        if (a.producto < b.producto) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
    } else if (tipo == "Precio") {
      this.productos.sort(function(a, b) {
        return a.precio - b.precio;
      });
    }
    else if (tipo == "Pais") {
        this.productos.sort(function(a, b) {
          if (a.pais > b.pais) {
            return 1;
          }
          if (a.pais < b.pais) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      } 
      else if (tipo == "Valoraciones") {
        this.productos.sort(function(a, b) {
            return a.valoracion - b.valoracion;
          });
      } 
  }
}
