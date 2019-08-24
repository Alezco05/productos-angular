import { Component, OnInit } from "@angular/core";
import { ProductoService } from "src/app/services/productos.service";
import { Producto } from "src/app/models/producto.model";
import { Router, Route, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-formulario",
  templateUrl: "./formulario.component.html",
  styleUrls: ["./formulario.component.css"]
})
export class FormularioComponent implements OnInit {
  ciudadInput: string = "";
  productoInput: string = "";
  paisInput: string = "";
  precioInput: number;
  selectedOption:number;
  index: number;
  valorar:number;
  valor:boolean = false;
  numbers;
  constructor(
    private productoService: ProductoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.numbers = Array(11).fill(0).map((x,i)=>i);
  }
  ngOnInit() {
    this.index = this.route.snapshot.params["id"];
    this.valorar = +this.route.snapshot.queryParams['valorar'];
    if(this.valorar!= null && this.valorar === 1){
      this.valor = true;
    }
    else{
      this.valor = false;
    }
    if (this.index) {
      const producto = this.productoService.getProducto(this.index);
      this.ciudadInput = producto.ciudad;
      this.productoInput = producto.producto;
      this.paisInput = producto.pais;
      this.precioInput = producto.precio;
    }
  }
  onGuardarPersona() {
    if (this.ciudadInput.length === 0) {
      alert("Nombre vacio");
      return;
    }
    if (this.productoInput.length === 0) {
      alert("Apellido vacio");
      return;
    }
    if (this.paisInput.length === 0) {
      alert("Pais vacio");
      return;
    }
    if (this.precioInput <= 0) {
      alert("Precio Invalido");
      return;
    }
    const producto = new Producto(
      this.ciudadInput,
      this.productoInput,
      this.paisInput,
      this.precioInput,
      0,
      0,
    );
    if(this.index){
      this.productoService.editProducto(this.index,producto);
    }else{
      this.productoService.agregarProducto(producto);
    }
    this.router.navigate(["productos"]);
  }
  eliminarProducto(){
    if(this.index){
      this.productoService.removeProducto(this.index);
    }
    this.router.navigate(["productos"]);
  }
  onValorarProducto(){
    this.productoService.valorarProducto(this.index,this.selectedOption);
    this.router.navigate(["productos"]);
  }
}
