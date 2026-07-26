import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonGrid, IonRow, IonCol, IonCard, IonCardHeader, 
  IonCardTitle, IonCardSubtitle, IonCardContent, 
  IonButton, IonIcon, IonSpinner, IonBadge, IonButtons
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonGrid, IonRow, IonCol, IonCard, IonCardHeader, 
    IonCardTitle, IonCardSubtitle, IonCardContent, 
    IonButton, IonIcon, IonSpinner, IonBadge, 
    CurrencyPipe
  ]
})
export class Tab2Page {
  private productService = inject(ProductService);

  // Mantenemos la conexión reactiva con las Signals
  public products = this.productService.products;
  public isLoading = this.productService.isLoading;

  constructor() {
    addIcons({ trashOutline });
  }

  //  Usar el ciclo de vida nativo de Ionic
  ionViewWillEnter() {
    // Esto conectará con tu API y actualizará la Signal justo a tiempo
    this.productService.loadProducts();
  }

  eliminarProducto(id: string | undefined) {
    if (id) {
      this.productService.deleteProduct(id);
    }
  }
}