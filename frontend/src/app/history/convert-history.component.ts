import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ConversionHistoryItem {
  originalText: string;
  numericValue: number | null;
  timestamp: Date;
}

@Component({
  selector: 'app-convert-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './convert-history.component.html',
  styleUrls: ['./convert-history.component.scss']
})
export class ConvertHistoryComponent {
  selectedFile: File | null = null;
  textContent: string = '';
  numericValue: number | null = null;
  error: string | null = null;
  history: ConversionHistoryItem[] = [];

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
      this.numericValue = null;
      return;
    }
    // You can use Number(), parseInt(), or + operator[5][2][3]
    const num = Number(this.textContent);
    if (!isNaN(num)) {
      this.numericValue = num;
      this.addToHistory(this.textContent, num);
    } else {
      this.error = 'The document does not contain a valid number.';
      this.numericValue = null;
      this.addToHistory(this.textContent, null);
    }
  }

  addToHistory(originalText: string, numericValue: number | null) {
    this.history.unshift({
      originalText,
      numericValue,
      timestamp: new Date()
    });
    // Keep only the latest 10 conversions
    if (this.history.length > 10) {
      this.history = this.history.slice(0, 10);
    }
  }
}
