import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:9090';
  private username: string | null = null;
  private password: string | null = null;

  constructor(private http: HttpClient) {}
  
  createUser(username: string, password: string): User{
    this.username = username;
    this.password = password;
    const user: User = {username: this.username, password: this.password};
    return user;
  }

  login(username: string, password: string): Observable<User> {
    const user: User = this.createUser(username, password);
    return this.http.post<User>(`${this.url}/api/login`, user);
  }

  register(username: string, password: string): Observable<User> {
    const user: User = this.createUser(username, password);
    return this.http.post<User>(`${this.url}/api/register`, user);
  }

  logout() {
    this.username = null;
    this.password = null;
  }

  isLoggedIn(): boolean {
    return this.username !== null && this.password !== null;
  }

  getUser(): User | undefined{
    if (!this.isLoggedIn()){
      return undefined;
    } 
    return {username: this.username!, password: this.password!};
  }

  getAuthHeaders(): HttpHeaders {
    if (!this.username || !this.password) {
      throw new Error('User not logged in');
    }

    return new HttpHeaders({
      Authorization: 'Basic ' + btoa(this.username + ':' + this.password)
    });
  }

}

