import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonBadge,
  IonIcon,
  IonButtons, // <-- Agregado para el menú
  IonSelect, // <-- Agregado para el menú
  IonSelectOption // <-- Agregado para el menú
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  headsetOutline, 
  cellularOutline, 
  laptopOutline, 
  gameControllerOutline 
} from 'ionicons/icons';

// Importamos el servicio de traducción
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonBadge,
    IonIcon,
    IonButtons,
    IonSelect,
    IonSelectOption,
    TranslatePipe // <-- Agregado a los imports
  ]
})
export class Tab1Page {
  public translate = inject(TranslateService);

  // 1. Leemos de memoria
  public idiomaActual: string = localStorage.getItem('idiomaApp') || 'es';

  constructor() {
    addIcons({ 
      headsetOutline, 
      cellularOutline, 
      laptopOutline, 
      gameControllerOutline 
    });
  }

  // 2. Refrescamos al entrar
  ionViewWillEnter() {
    this.idiomaActual = localStorage.getItem('idiomaApp') || 'es';
  }

  // 3. Función para cambiar idioma
  public cambiarIdioma(evento: CustomEvent): void {
    const idiomaSeleccionado = evento.detail.value;
    
    this.idiomaActual = idiomaSeleccionado;
    this.translate.use(idiomaSeleccionado);
    localStorage.setItem('idiomaApp', idiomaSeleccionado);
  }
}