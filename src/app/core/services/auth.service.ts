import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ApiBaseService } from './api-base.service';
import {
  AuthUser,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from '../models/auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'bandhub_token';
  private readonly REFRESH_KEY = 'bandhub_refresh';
  private readonly USER_KEY = 'bandhub_user';

  // Signal reativo — qualquer componente pode ler o usuário atual
  private _user = signal<AuthUser | null>(this.loadUser());
  readonly user = this._user.asReadonly();

  constructor(
    private http: HttpClient,
    private api: ApiBaseService,
    private router: Router,
  ) {}

  // ── Autenticação ──────────────────────────────────────────────────────────

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.api.apiBaseUrl}/auth/login`, request)
      .pipe(tap((response) => this.saveSession(response)));
  }

  register(request: RegisterRequest): Observable<unknown> {
    return this.http.post(
      `${this.api.apiBaseUrl}/bff/accounts/register/user`,
      request,
    );
  }

  logout(): void {
    // 1. Chama o backend para revogar o refresh token no banco
    //    Usa o token atual (ainda está no localStorage neste momento)
    this.http.post(`${this.api.apiBaseUrl}/auth/logout`, {}).subscribe({
      complete: () => this.clearSession(),
      error: () => this.clearSession(), // mesmo com erro, limpa localmente
    });
  }

  private clearSession(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
    localStorage.removeItem(this.USER_KEY);
    this._user.set(null);
    this.router.navigate(['/']);
  }

  // ── Token ─────────────────────────────────────────────────────────────────

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // ── Helpers privados ──────────────────────────────────────────────────────

  private saveSession(response: LoginResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.acessToken);
    localStorage.setItem(this.REFRESH_KEY, response.refreshToken);

    const user: AuthUser = {
      accountId: response.accountId,
      name: response.name,
      email: response.email,
      accountType: response.accountType,
    };

    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this._user.set(user);
  }

  private loadUser(): AuthUser | null {
    const stored = localStorage.getItem(this.USER_KEY);
    return stored ? (JSON.parse(stored) as AuthUser) : null;
  }
}
