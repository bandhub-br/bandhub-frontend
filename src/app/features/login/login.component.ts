import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoginRequest, RegisterRequest } from '../../core/models/auth.models';

type Mode = 'login' | 'cadastro';

function passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
  const senha = group.get('senha')?.value;
  const confirmar = group.get('confirmarSenha')?.value;
  return senha && confirmar && senha !== confirmar ? { passwordsMismatch: true } : null;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  mode = signal<Mode>('login');
  loading = signal(false);
  errorMessage = signal<string | null>(null);

  loginForm: FormGroup;
  cadastroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.cadastroForm = this.fb.group(
      {
        nome: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        senha: ['', [Validators.required, Validators.minLength(6)]],
        confirmarSenha: ['', Validators.required],
      },
      { validators: passwordsMatchValidator }
    );
  }

  setMode(m: Mode) {
    this.mode.set(m);
    this.errorMessage.set(null);
    this.loginForm.reset();
    this.cadastroForm.reset();
  }

  onLogin() {
    if (this.loginForm.invalid) { this.loginForm.markAllAsTouched(); return; }

    this.loading.set(true);
    this.errorMessage.set(null);

    const request: LoginRequest = {
      email:    this.loginForm.value.email,
      password: this.loginForm.value.senha,
    };

    this.authService.login(request).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.errorMessage.set(err.error?.message ?? 'E-mail ou senha inválidos.');
        this.loading.set(false);
      },
    });
  }

  onCadastro() {
    if (this.cadastroForm.invalid) { this.cadastroForm.markAllAsTouched(); return; }

    this.loading.set(true);
    this.errorMessage.set(null);

    const request: RegisterRequest = {
      name:     this.cadastroForm.value.nome,
      email:    this.cadastroForm.value.email,
      password: this.cadastroForm.value.senha,
    };

    this.authService.register(request).subscribe({
      next: () => this.setMode('login'),
      error: (err) => {
        this.errorMessage.set(err.error?.message ?? 'Erro ao criar conta. Tente novamente.');
        this.loading.set(false);
      },
    });
  }

  // Login getters
  get lEmail() { return this.loginForm.get('email')!; }
  get lSenha() { return this.loginForm.get('senha')!; }

  // Cadastro getters
  get cNome()      { return this.cadastroForm.get('nome')!; }
  get cEmail()     { return this.cadastroForm.get('email')!; }
  get cSenha()     { return this.cadastroForm.get('senha')!; }
  get cConfirmar() { return this.cadastroForm.get('confirmarSenha')!; }
}
