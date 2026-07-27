import { Component, inject, signal } from '@angular/core';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonButton
} from '@ionic/angular/standalone';

import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonToggle,
    IonButton
  ]
})
export class Tab3Page {

  private productService = inject(ProductService);

  public producto = signal<Partial<Product>>({
    nombre: '',
    precio: 0,
    categoria: '',
    stock: 0,
    activo: true
  });

  public actualizarNombre(evento: CustomEvent): void {
    const nombre = evento.detail.value ?? '';

    this.producto.update(productoActual => ({
      ...productoActual,
      nombre
    }));
  }

  public actualizarPrecio(evento: CustomEvent): void {
    const precio = Number(evento.detail.value ?? 0);

    this.producto.update(productoActual => ({
      ...productoActual,
      precio
    }));
  }

  public actualizarCategoria(evento: CustomEvent): void {
    const categoria = evento.detail.value ?? '';

    this.producto.update(productoActual => ({
      ...productoActual,
      categoria
    }));
  }

  public actualizarStock(evento: CustomEvent): void {
    const stock = Number(evento.detail.value ?? 0);

    this.producto.update(productoActual => ({
      ...productoActual,
      stock
    }));
  }

  public actualizarActivo(evento: CustomEvent): void {
    const activo = evento.detail.checked ?? false;

    this.producto.update(productoActual => ({
      ...productoActual,
      activo
    }));
  }

  public guardarProducto(): void {
    const datosProducto = this.producto();

    const nombre = datosProducto.nombre?.trim();
    const categoria = datosProducto.categoria?.trim();
    const precio = Number(datosProducto.precio);
    const stock = Number(datosProducto.stock);

    if (!nombre || !categoria) {
      alert('Completa el nombre y la categoría.');
      return;
    }

    if (precio <= 0) {
      alert('El precio debe ser mayor que cero.');
      return;
    }

    if (stock < 0) {
      alert('El stock no puede ser negativo.');
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

    alert('Producto enviado correctamente.');

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