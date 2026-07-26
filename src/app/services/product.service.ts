import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  // Signals para manejar el estado de los productos en la aplicación
  public products = signal<Product[]>([]);
  public isLoading = signal<boolean>(false);

  // Reemplaza esta URL con la ruta real donde tienes desplegada tu API (ej. Vercel)
  private apiUrl = 'https://api-catalogo-weld.vercel.app/api/productos';

  constructor() { }

  /**
   * 1. OBTENER TODOS LOS PRODUCTOS (GET)
   */
  public loadProducts() {
    this.isLoading.set(true);

    this.http.get<Product[]>(this.apiUrl).subscribe({
      next: (data) => {
        // Tu API de Flask devuelve directamente el arreglo de productos
        this.products.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error al obtener los productos:', err);
        this.isLoading.set(false);
      }
    });
  }

  /**
   * 2. CREAR UN NUEVO PRODUCTO (POST)
   */
  public createProduct(newProduct: Product) {
    this.http.post(this.apiUrl, newProduct).subscribe({
      next: (response: any) => {
        console.log('Producto creado con éxito', response);
        // Recargamos la lista para ver el nuevo producto
        this.loadProducts();
      },
      error: (err) => {
        console.error('Error al crear el producto:', err);
      }
    });
  }

  /**
   * 3. ACTUALIZAR UN PRODUCTO (PUT)
   */
  public updateProduct(id: string, productData: Partial<Product>) {
    this.http.put(`${this.apiUrl}/${id}`, productData).subscribe({
      next: (response: any) => {
        console.log('Producto actualizado', response);
        // Actualizamos la lista localmente
        this.loadProducts();
      },
      error: (err) => {
        console.error('Error al actualizar el producto:', err);
      }
    });
  }

  /**
   * 4. ELIMINAR / DESACTIVAR PRODUCTO (DELETE)
   */
  public deleteProduct(id: string) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: (response: any) => {
        console.log('Producto eliminado', response);
        // Actualizamos la signal eliminando el producto borrado sin hacer otra petición
        this.products.update(currentProducts => 
          currentProducts.filter(p => p._id !== id)
        );
      },
      error: (err) => {
        console.error('Error al eliminar el producto:', err);
      }
    });
  }
}