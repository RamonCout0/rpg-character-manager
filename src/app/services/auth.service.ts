import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { API_URL } from '../core/api.config';
import { LoginRequest, LoginResponse } from '../models/auth';

const TOKEN_KEY = 'rpg.token';
const USER_KEY = 'rpg.user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);

  // Estado mantido em signals e persistido no localStorage para sobreviver a refresh.
  private readonly token = signal<string | null>(localStorage.getItem(TOKEN_KEY));
  readonly currentUser = signal<string | null>(localStorage.getItem(USER_KEY));

  /** True enquanto houver um token armazenado. Usado pelo Guard. */
  readonly isAuthenticated = computed(() => this.token() !== null);

  /** Autentica no backend e guarda o token JWT recebido. */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${API_URL}/auth/login`, credentials).pipe(
      tap((response) => {
        const displayName = response.name || response.username;
        localStorage.setItem(TOKEN_KEY, response.token);
        localStorage.setItem(USER_KEY, displayName);
        this.token.set(response.token);
        this.currentUser.set(displayName);
      })
    );
  }

  /** Limpa o token e os dados do usuário. */
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.token.set(null);
    this.currentUser.set(null);
  }

  /** Token atual (usado pelo interceptor). */
  getToken(): string | null {
    return this.token();
  }
}
