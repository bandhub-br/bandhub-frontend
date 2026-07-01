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

  loginForm: FormGroup;
  cadastroForm: FormGroup;

  constructor(private fb: FormBuilder) {
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
    this.loginForm.reset();
    this.cadastroForm.reset();
  }

  onLogin() {
    if (this.loginForm.invalid) { 
      this.loginForm.markAllAsTouched(); return; 
    }
    console.log('Login:', this.loginForm.value);
  }

  onCadastro() {
    if (this.cadastroForm.invalid) { 
      this.cadastroForm.markAllAsTouched(); return; 
    }
    console.log('Cadastro:', this.cadastroForm.value);
  }

  // Login getters
  get lEmail() { 
    return this.loginForm.get('email')!; 
  }

  get lSenha() { 
    return this.loginForm.get('senha')!; 
  }

  // Cadastro getters
  get cNome()      { 
    return this.cadastroForm.get('nome')!; 
  }
  get cEmail()     { 
    return this.cadastroForm.get('email')!; 
  }
  get cSenha()     { 
    return this.cadastroForm.get('senha')!; 
  }
  get cConfirmar() { 
    return this.cadastroForm.get('confirmarSenha')!; 
  }
}
