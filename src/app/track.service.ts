import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  configUrl = 'http://localhost:8081/api';
  constructor(private http: HttpClient) { }

  updateStatus(status: string, location: { lat: number, long: number }) {
    return this.http.post(`${this.configUrl}/updateStatus`, {status,  location},  { withCredentials: true });
  }

  getStatus() {
    return this.http.post<{status: string}>(`${this.configUrl}/status`, { withCredentials: true });
  }
}
