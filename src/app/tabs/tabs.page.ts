import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, pricetagsOutline, addCircleOutline } from 'ionicons/icons';

// 👇 Importamos el Pipe de traducción
import { TranslatePipe } from '@ngx-translate/core'; 

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true, // <-- Asegúrate de que esto esté
  imports: [
    IonTabs, 
    IonTabBar, 
    IonTabButton, 
    IonIcon, 
    IonLabel, 
    TranslatePipe // <-- Lo agregamos aquí
  ],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    addIcons({ 
      homeOutline, 
      pricetagsOutline, 
      addCircleOutline 
    });
  }
}