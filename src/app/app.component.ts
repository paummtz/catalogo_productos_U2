import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  private translate = inject(TranslateService);

  constructor() {
    // 1. Configuramos el idioma de respaldo por si algo falla
    this.translate.setFallbackLang('es');
    
    // 2. Leemos la memoria del teléfono ANTES de cargar cualquier Tab
    const idiomaGuardado = localStorage.getItem('idiomaApp') || 'es';
    
    // 3. Le decimos al servicio global que use ese idioma para toda la app
    this.translate.use(idiomaGuardado);
  }
}