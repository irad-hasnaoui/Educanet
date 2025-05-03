import { Component } from '@angular/core';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.scss']
})
export class ConvertComponent {
  selectedFile: File | null = null;
  textContent: string = '';
  numberValue: number | null = null;
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
      this.error = 'Error reading file.';
    };
    reader.readAsText(this.selectedFile);
  }

  convertTextToNumber() {
    this.error = null;
    if (!this.textContent || this.textContent.trim().length === 0) {
      this.error = 'The document is empty.';
      this.numberValue = null;
      return;
    }
    // Use Number() to convert string to number, as recommended[4][5]
    const num = Number(this.textContent);
    if (!isNaN(num)) {
      this.numberValue = num;
    } else {
      this.error = 'The document does not contain a valid number.';
      this.numberValue = null;
    }
  }
}
