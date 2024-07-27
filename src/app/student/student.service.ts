import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentFormData } from "./student.interface";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'https://api-staging.cakap.com/v2/students/create-child-student';
  private token = 'Bearer 006d6102-bdb3-49c6-99fc-04aa9e53e67c'; // This token is just an example. It should be stored securely.

  /**
   * Constructor for StudentService.
   * @param {HttpClient} http - HttpClient instance for making HTTP requests.
   */
  constructor(private http: HttpClient) { }


  /**
   * Creates a child student.
   * @param {File | null} avatar - The avatar file to be uploaded.
   * @param {any} request - The request payload.
   * @returns {Observable<any>} - An observable of the HTTP response.
   */
  createChildStudent(avatar: null | File, request: StudentFormData): Observable<any> {
    const formData: FormData = new FormData();
    // if avatar is not null, append it to the formData
    if (avatar) {
      formData.append('avatar', avatar);
    }
    // append the request payload to the formData
    formData.append('request', JSON.stringify(request));

    // create headers with the token
    const headers = new HttpHeaders({
      'Authorization': this.token
    });

    // return the HTTP POST request
    return this.http.post<any>(this.apiUrl, formData, { headers });
  }

}
