// src/app/features/auth/callback/callback.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-callback-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="callback-container">
      <div class="spinner"></div>
      <p>{{ message }}</p>

      @if (error) {
      <div class="error">
        <p>{{ error }}</p>
        <button (click)="redirectToLogin()">Return to Login</button>
      </div>
      }
    </div>
  `,
  styles: [
    `
      .callback-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
      }

      .spinner {
        width: 50px;
        height: 50px;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin-bottom: 1rem;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      p {
        font-size: 1.125rem;
        margin: 0.5rem 0;
      }

      .error {
        background: white;
        color: #d32f2f;
        padding: 2rem;
        border-radius: 8px;
        margin-top: 2rem;
        text-align: center;
      }

      button {
        margin-top: 1rem;
        padding: 0.75rem 1.5rem;
        background: #667eea;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1rem;
      }

      button:hover {
        background: #5568d3;
      }
    `,
  ],
})
export class CallbackComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);

  message = 'Completing sign in...';
  error = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const accessToken = params['access_token'];
      const refreshToken = params['refresh_token'];
      const error = params['error'];

      if (error) {
        this.error = 'Authentication failed. Please try again.';
        this.message = '';
        return;
      }

      if (accessToken && refreshToken) {
        this.handleTokens({ access_token: accessToken, refresh_token: refreshToken });
      } else {
        this.error = 'Invalid authentication response.';
        this.message = '';
      }
    });
  }

  private handleTokens(tokens: { access_token: string; refresh_token: string }): void {
    this.authService.handleCallback(tokens).subscribe({
      next: (user) => {
        const returnUrl = sessionStorage.getItem('returnUrl') || '/home';
        sessionStorage.removeItem('returnUrl');
        this.router.navigate([returnUrl]);
      },
      error: (err) => {
        console.error('Error during authentication:', err);
        this.error = 'Failed to complete sign in. Please try again.';
        this.message = '';
      },
    });
  }

  redirectToLogin(): void {
    this.router.navigate(['/home']);
  }
}
