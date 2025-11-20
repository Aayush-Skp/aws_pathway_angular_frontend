import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  get<T>(endpoint: string, params?: HttpParams): Observable<HttpResponse<T>> {
    const options = params
      ? { ...this.httpOptions, params, observe: 'response' as const }
      : { ...this.httpOptions, observe: 'response' as const };

    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, options).pipe(
      retry(1),
      tap((response) => this.logResponse(endpoint, response)),
      catchError(this.handleError)
    );
  }

  post<T>(
    endpoint: string,
    body?: any,
    params?: HttpParams,
    customHeader?: HttpHeaders
  ): Observable<HttpResponse<T>> {
    const headers = customHeader || this.httpOptions.headers;
    const options = {
      headers,
      params: params,
      observe: 'response' as const,
    };
    this.logRequest('POST', endpoint, { ...options, body });
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, options).pipe(
      tap((response) => this.logResponse(endpoint, response)),
      catchError(this.handleError)
    );
  }

  postMultipart<T>(
    endpoint: string,
    formData: FormData,
    params?: HttpParams
  ): Observable<HttpResponse<T>> {
    const url = `${this.baseUrl}/${endpoint}`;

    // Don't include Content-Type header for multipart - browser sets it with boundary
    const options = {
      params: params,
      observe: 'response' as const,
    };

    this.logRequest('POST', url, { ...options, formData });
    return this.http.post<T>(url, formData, options).pipe(
      tap((response) => this.logResponse(url, response)),
      catchError(this.handleError)
    );
  }

  put<T>(endpoint: string, body: any, params?: HttpParams): Observable<HttpResponse<T>> {
    const options = {
      headers: this.httpOptions.headers,
      params: params,
      observe: 'response' as const,
    };
    this.logRequest('PUT', endpoint, { ...options, body });
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, options).pipe(
      tap((response) => this.logResponse(endpoint, response)),
      catchError(this.handleError)
    );
  }

  delete<T>(endpoint: string, params?: HttpParams): Observable<HttpResponse<T>> {
    const options = {
      headers: this.httpOptions.headers,
      params: params,
      observe: 'response' as const,
    };

    this.logRequest('DELETE', endpoint, options);

    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, options).pipe(
      tap((response) => this.logResponse(endpoint, response)),
      catchError(this.handleError)
    );
  }

  patch<T>(endpoint: string, body: any, params?: HttpParams): Observable<HttpResponse<T>> {
    const options = {
      headers: this.httpOptions.headers,
      params: params,
      observe: 'response' as const,
    };
    this.logRequest('PATCH', endpoint, { ...options, body });
    return this.http.patch<T>(`${this.baseUrl}/${endpoint}`, body, options).pipe(
      tap((response) => this.logResponse(endpoint, response)),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.status
        ? `Server Error ${error.status}: ${error.message}`
        : 'Server Error';
    }
    console.error('API Error:', error);
    return throwError(() => new Error(errorMessage));
  }

  private logRequest(method: string, url: string, options?: any): void {
    if (!environment.production) {
      console.log(`HTTP ${method} Request to ${url}`, options);
    }
  }

  private logResponse(url: string, response: any): void {
    if (!environment.production) {
      console.log(`Response from ${url}`, response);
    }
  }
}
