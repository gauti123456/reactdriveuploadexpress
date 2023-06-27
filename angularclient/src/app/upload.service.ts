import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  uploadFiles(files: File[]): Promise<any> {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    return this.http
      .post('http://localhost:3001/upload', formData)
      .toPromise()
      .then((response) => response)
      .catch((error) => {
        console.error('Error uploading files:', error);
        throw new Error('An error occurred during file upload.');
      });
  }
}
