import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-convert-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './convert-error.component.html',
  styleUrls: ['./convert-error.component.scss']
})
export class ConvertErrorComponent {
  selectedFile: File | null = null;
  textContent: string = '';
  numericValue: number | null = null;
  error: string | null = null;

  onFileSelected(event: Event) {
    this.error = null;
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.readFile();
    }
  }

  readFile() {
    if (!this.selectedFile) {
      this.error = 'No file selected.';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.textContent = (reader.result as string).trim();
      this.convertTextToNumber();
    };
    reader.onerror = () => {
      this.error = 'Error reading file.';
    };
    reader.readAsText(this.selectedFile);
  }

  convertTextToNumber() {
    this.error = null;
    if (!this.textContent) {
      this.error = 'The document is empty or could not be read.';
      this.numericValue = null;
      return;
    }
    // Use Number() for conversion as recommended[5]
    const num = Number(this.textContent);
    if (!isNaN(num)) {
      this.numericValue = num;
    } else {
      this.error = 'The document text could not be converted to a valid number.';
      this.numericValue = null;
    }
  }
}
