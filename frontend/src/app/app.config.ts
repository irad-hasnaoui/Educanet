// app.config.ts

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
     provideHttpClient(),
     provideAnimations(),
    // Des services spécifiques à la conversion texte-numérique
  ]
};


export interface ConversionResult {
  numericValue: number;
  originalText: string;
  success: boolean;
  errorMessage?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ConversionService {

  private apiUrl = '/api/convert'; // URL de votre backend Spring Boot

  constructor(private http: HttpClient) {}

  /**
   * Envoie un texte au backend pour conversion en numérique.
   * @param text Texte à convertir
   * @returns Observable avec le résultat de la conversion
   */
  convertTextToNumber(text: string): Observable<ConversionResult> {
    return this.http.post<ConversionResult>(this.apiUrl, { text });
  }
}

