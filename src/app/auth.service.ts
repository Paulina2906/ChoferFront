import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  configUrl = 'http://localhost:8081';

  resgister(body: { email: string | null; username: string | null; password: string | null; }) {
    return this.http.post<{status: Number}>(`${this.configUrl}/register`, body);
  }

  login(body: { username: string | null; password: string | null; }) {
    return this.http.post<{status: Number}>(`${this.configUrl}/login`, body);
  }

  updateStatus(body: { status: string | null; location: { lat: string, long: string }; }) {
    return this.http.post<{status: Number}>(`${this.configUrl}/updateStatus`, body);
  }

}
