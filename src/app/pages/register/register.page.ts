import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CountriesService, Country } from '../../services/countries.services';
import { AuthService, AppUser } from '../../services/auth.services';  
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;

  countries: Country[] = [];
  loadingCountries = false;
  countriesError = '';
   showPass = false;
  showConfirm = false;


togglePass()    { this.showPass = !this.showPass; }
toggleConfirm() { this.showConfirm = !this.showConfirm; }
  

countries22: Array<{ name: string; flag?: string }> = [
    { name: 'Colombia', flag: '🇨🇴' },
    { name: 'Peru', flag: '🇵🇪' },
    { name: 'Mexico', flag: '🇲🇽' },
    { name: 'Argentina', flag: '🇦🇷' },
    { name: 'Spain', flag: '🇪🇸' },
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private countriesSrv: CountriesService,
    private auth: AuthService,

  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        country: ['', Validators.required],            // se llena desde la API
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatch }
    );

    this.loadCountries();
  }

  private loadCountries() {
     this.loadingCountries = true;
  this.countriesSrv.getCountries().subscribe({
    next: (list) => (this.countries = list),
    error: (err) => {
      console.error('Error cargando países:', err);
      this.countriesError = 'No se pudieron cargar los países. Usando lista local.';
      this.countries = this.countries22 as any;
    },
    complete: () => (this.loadingCountries = false),
  });
  }

  private passwordMatch = (form: FormGroup) => {
    const p = form.get('password')?.value;
    const c = form.get('confirmPassword')?.value;
    return p && c && p !== c ? { mismatch: true } : null;
  };

  onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    console.log('✅ Payload:', this.registerForm.value);
    // TODO: llamar a tu backend aquí
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
  onSubmit() {
    const payload = this.registerForm.value;                 // { firstName, lastName, country, email, password }
  const res = this.auth.register(payload);
  if (res.ok) {
    alert('Usuario registrado');
    this.router.navigate(['/login']);
  } else {
    alert(res.message || 'No se pudo registrar');
  }
  }

  
}
