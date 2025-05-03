import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Text Document to Numeric Converter</h1>
    <section>
      <input type="file" accept=".txt" (change)="onFileSelected($event)" />
      <div *ngIf="error" style="color: red; margin-top: 1rem;">
        {{ error }}
      </div>
      <div *ngIf="numericValue !== null" style="margin-top: 1rem;">
        <strong>Converted Number:</strong> {{ numericValue }}
      </div>
    </section>
  `,
  styles: [`
    h1 {
      text-align: center;
      margin-top: 2rem;
    }
    section {
      max-width: 400px;
      margin: 2rem auto;
      padding: 1rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      background: #fafafa;
      font-family: Arial, sans-serif;
    }
    input[type="file"] {
      margin-bottom: 1rem;
    }
  `]
})
export class AppComponent {
  numericValue: number | null = null;
  error: string | null = null;

  onFileSelected(event: Event) {
    this.error = null;
    this.numericValue = null;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.readFile(file);
    }
  }

  readFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const text = (reader.result as string).trim();
      this.convertTextToNumber(text);
    };
    reader.onerror = () => {
      this.error = 'Error reading file.';
    };
    reader.readAsText(file);
  }

  convertTextToNumber(text: string) {
    // Recommended: Number(), parseInt(), or unary plus[5][7][9]
    const num = Number(text);
    if (!isNaN(num)) {
      this.numericValue = num;
    } else {
      this.error = 'The document text could not be converted to a valid number.';
    }
  }
}
