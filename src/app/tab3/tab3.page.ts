import { Component, inject, signal } from '@angular/core';

import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonList, IonItem, IonInput, IonSelect,
  IonSelectOption, IonToggle, IonButton,
  IonButtons 
} from '@ionic/angular/standalone';

import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonItem, IonInput, IonSelect,
    IonSelectOption, IonToggle, IonButton,
    IonButtons,
    TranslatePipe 
  ]
})
export class Tab3Page {

  private productService = inject(ProductService);
  public translate = inject(TranslateService); 

  public producto = signal<Partial<Product>>({
    nombre: '',
    precio: 0,
    categoria: '',
    stock: 0,
    activo: true
  });

  // 1. Leemos directamente de la memoria al inicializar la clase
  public idiomaActual: string = localStorage.getItem('idiomaApp') || 'es';

  // 2. Refrescamos el valor visual cada vez que el usuario entra a la pestaña Tab 3
  ionViewWillEnter() {
    this.idiomaActual = localStorage.getItem('idiomaApp') || 'es';
  }

  // 3. Función para cambiar de idioma
  public cambiarIdioma(evento: CustomEvent): void {
    const idiomaSeleccionado = evento.detail.value;
    
    this.idiomaActual = idiomaSeleccionado; // Actualizamos la vista local (el select)
    this.translate.use(idiomaSeleccionado); // Traducimos toda la app
    localStorage.setItem('idiomaApp', idiomaSeleccionado); // Guardamos en memoria
  }

  public actualizarNombre(evento: CustomEvent): void {
    const nombre = evento.detail.value ?? '';
    this.producto.update(productoActual => ({ ...productoActual, nombre }));
  }

  public actualizarPrecio(evento: CustomEvent): void {
    const precio = Number(evento.detail.value ?? 0);
    this.producto.update(productoActual => ({ ...productoActual, precio }));
  }

  public actualizarCategoria(evento: CustomEvent): void {
    const categoria = evento.detail.value ?? '';
    this.producto.update(productoActual => ({ ...productoActual, categoria }));
  }

  public actualizarStock(evento: CustomEvent): void {
    const stock = Number(evento.detail.value ?? 0);
    this.producto.update(productoActual => ({ ...productoActual, stock }));
  }

  public actualizarActivo(evento: CustomEvent): void {
    const activo = evento.detail.checked ?? false;
    this.producto.update(productoActual => ({ ...productoActual, activo }));
  }

  public guardarProducto(): void {
    const datosProducto = this.producto();

    const nombre = datosProducto.nombre?.trim();
    const categoria = datosProducto.categoria?.trim();
    const precio = Number(datosProducto.precio);
    const stock = Number(datosProducto.stock);

    if (!nombre || !categoria) {
      alert(this.translate.instant('TAB3.ERR_INCOMPLETE'));
      return;
    }

    if (precio <= 0) {
      alert(this.translate.instant('TAB3.ERR_PRICE'));
      return;
    }

    if (stock < 0) {
      alert(this.translate.instant('TAB3.ERR_STOCK'));
      return;
    }

    const nuevoProducto = {
      nombre,
      precio,
      categoria,
      stock,
      activo: datosProducto.activo ?? true
    } as Product;

    this.productService.createProduct(nuevoProducto);

    alert(this.translate.instant('TAB3.MSG_SUCCESS'));

    this.limpiarFormulario();
  }

  private limpiarFormulario(): void {
    this.producto.set({
      nombre: '',
      precio: 0,
      categoria: '',
      stock: 0,
      activo: true
    });
  }
}