import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonGrid, IonRow, IonCol, IonCard, IonCardHeader, 
  IonCardTitle, IonCardSubtitle, IonCardContent, 
  IonButton, IonIcon, IonSpinner, IonBadge,
  IonButtons, IonSelect, IonSelectOption 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { ProductService } from '../services/product.service';

import { TranslatePipe, TranslateService } from '@ngx-translate/core';

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
    IonButtons, IonSelect, IonSelectOption,
    CurrencyPipe,
    TranslatePipe 
  ]
})
export class Tab2Page {
  private productService = inject(ProductService);
  public translate = inject(TranslateService);

  public products = this.productService.products;
  public isLoading = this.productService.isLoading;
  
  // 1. Leemos directamente de la memoria al inicializar la clase
  public idiomaActual: string = localStorage.getItem('idiomaApp') || 'es';

  constructor() {
    addIcons({ trashOutline });
  }

  // 2. Refrescamos el valor visual cada vez que el usuario entra a la pestaña Tab 2
  ionViewWillEnter() {
    this.idiomaActual = localStorage.getItem('idiomaApp') || 'es';
    this.productService.loadProducts();
  }

  eliminarProducto(id: string | undefined) {
    if (id) {
      this.productService.deleteProduct(id);
    }
  }

  // 3. Función para cambiar de idioma
  changeLanguage(event: CustomEvent) {
    const selectedLang = event.detail.value;
    
    this.idiomaActual = selectedLang; // Actualizamos la vista local (el select)
    this.translate.use(selectedLang); // Traducimos toda la app
    localStorage.setItem('idiomaApp', selectedLang); // Guardamos en memoria
  }
}