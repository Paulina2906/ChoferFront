import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of, throwError } from 'rxjs';

interface UserInfo {
  createdAt: string;
  email: string;
  id: string;
  updatedAt: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  configUrl = 'http://localhost:8081/api';

  resgister(body: { email: string | null; username: string | null; password: string | null; }) {
    return this.http.post<UserInfo>(`${this.configUrl}/register`, body, { withCredentials: true }).pipe(catchError(err => {
      console.log(err);
      alert(`Error: ${err}`);
      return of();
    }));
  }

  login(body: { email: string | null; password: string | null; }) {
    return this.http.post<UserInfo>(`${this.configUrl}/login`, body, { withCredentials: true });
  }

  logout() {
    return this.http.post(`${this.configUrl}/logout`, {}, { withCredentials: true, responseType: 'text' }).pipe(catchError(err => {
      console.log('sdg',err);
      return of();
    }));;
  }

  profile() {
    return this.http.get<UserInfo>(`${this.configUrl}/profile`, { withCredentials: true }).pipe(catchError(err => {
      console.log(err);
      return of(false);
    }));
  }
}
