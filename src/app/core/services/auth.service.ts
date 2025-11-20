import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiService } from './api.service';

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}
export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiService = inject(ApiService);
  private router = inject(Router);

  private readonly TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly API_URL = environment.apiUrl;

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    if (this.hasToken()) {
      this.loadCurrentUser().subscribe();
    }
  }

  loginWithGoogle(): void {
    window.location.href = `${this.API_URL}/v1/auth/google/login`;
  }

  handleCallback(tokens: AuthTokens): Observable<User> {
    this.setTokens(tokens);
    return this.loadCurrentUser();
  }

  refreshToken(): Observable<AuthTokens> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.apiService
      .post<AuthTokens>('auth/refresh', {
        refresh_token: refreshToken,
      })
      .pipe(
        map((response) => response.body!),
        tap((tokens) => this.setTokens(tokens)),
        catchError((error) => {
          this.logout();
          return throwError(() => error);
        })
      );
  }

  getCurrentUser(): Observable<User> {
    return this.apiService.get<User>('v1/auth/users/me').pipe(
      map((response) => response.body!),
      tap((user) => this.currentUserSubject.next(user)),
      catchError((error) => {
        if (error.status === 401) {
          this.logout();
        }
        return throwError(() => error);
      })
    );
  }

  private loadCurrentUser(): Observable<User> {
    return this.getCurrentUser().pipe(tap(() => this.isAuthenticatedSubject.next(true)));
  }

  logout(): void {
    this.clearTokens();
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  /* Token Management */
  getAccessToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  private setTokens(tokens: AuthTokens): void {
    localStorage.setItem(this.TOKEN_KEY, tokens.access_token);
    console.log(tokens.access_token);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refresh_token);
    console.log(tokens.refresh_token);
  }

  private clearTokens(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  private hasToken(): boolean {
    return !!this.getAccessToken();
  }

  /**
   * Check if user is authenticated (synchronous)
   */
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
