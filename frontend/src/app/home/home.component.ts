import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  selectedFile: File | null = null;
  textContent: string = '';
  numericValue: number | null = null;
  numericImage: string | null = null;
  error: string | null = null;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.readFile();
    }
  }

  readFile() {
    if (!this.selectedFile) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.textContent = (reader.result as string).trim();
      this.convertTextToNumber();
    };
    reader.onerror = () => {
      this.error = 'Error reading file';
    };
    reader.readAsText(this.selectedFile);
  }

  convertTextToNumber() {
    this.error = null;
    // Try to convert the text to a number (int or float)
    const num = Number(this.textContent);
    if (!isNaN(num)) {
      this.numericValue = num;
      this.generateNumericImage();
    } else {
      this.numericValue = null;
      this.numericImage = null;
      this.error = 'The text could not be converted to a number.';
    }
  }

  generateNumericImage() {
    if (this.numericValue === null) return;
    // Generate a simple SVG image with the numeric value as text
    const svg = `
      <svg width="200" height="80" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="80" fill="#f5f5f5" stroke="#333" />
        <text x="100" y="50" font-size="32" text-anchor="middle" fill="#333" alignment-baseline="middle">
          ${this.numericValue}
        </text>
      </svg>
    `;
    this.numericImage = 'data:image/svg+xml;base64,' + btoa(svg);
  }
}
