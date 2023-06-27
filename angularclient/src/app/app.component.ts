import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('fileInput')
  fileInput!: ElementRef;
  files: File[] = [];

  constructor(private http: HttpClient) { }

  handleFileSelect(fileInput: any): void {
    const files = fileInput?.files;

    if (files && files.length > 0) {
      this.files = Array.from(files);
    }
  }

  uploadFiles(): void {
    if (this.files.length > 0) {
      const formData = new FormData();
      this.files.forEach(file => {
        formData.append('files', file, file.name);
      });

      this.http.post('http://localhost:3001/upload', formData)
        .subscribe(
          response => {
            console.log('Files uploaded successfully:', response);
          },
          error => {
            console.error('Error uploading files:', error);
          }
        );
    }
  }

  clearFileInput(): void {
    this.fileInput.nativeElement.value = '';
    this.files = [];
  }
}
