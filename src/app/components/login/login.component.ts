import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  username = signal<string>('');
  password = signal<string>('');
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  submit(): void {
    if (!this.username().trim() || !this.password().trim()) {
      this.error.set('Informe usuário e senha.');
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.auth.login({ username: this.username(), password: this.password() }).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/characters']);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Usuário ou senha inválidos.');
      }
    });
  }
}
