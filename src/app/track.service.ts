import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';


interface Status {
  title: string,
  description: {
    lat: number,
    long: number
  },
}
@Injectable({
  providedIn: 'root'
})
export class TrackService {
  configUrl = 'http://localhost:8081/api';
  constructor(private http: HttpClient) { }

  addStatus(status: string, l: { lat: number, long: number }) {
    return this.http.post(`${this.configUrl}/CreateTask`, {title: status,  description: `lat:${l.lat},long:${l.long}` },  { withCredentials: true });
  }

  getStatus() {
    return this.http.get<{ title: string, description: string }[]>(`${this.configUrl}/tasks`, { withCredentials: true }).pipe(map(res => {
      return res.map(i => ({ status: i.title, location: i.description }));
    }));
  }
}
