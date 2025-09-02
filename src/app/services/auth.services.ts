import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
export interface AppUser {
  firstName: string;
  lastName: string;
  country: string;
  email: string;
  password: string; // (simple, sin hash mientras no haya backend)
}

const USERS_KEY = 'app.users';
const SESSION_KEY = 'app.session';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private router: Router) {}

  // ---- Persistencia básica ----
  private loadUsers(): AppUser[] {
      const raw = JSON.parse(localStorage.getItem(USERS_KEY) || '[]') as AppUser[];

  // Si la contraseña no parece SHA-256 (64 hex), la hasheamos.
  const hex64 = /^[a-f0-9]{64}$/i;
  const normalized = raw.map(u => ({
    ...u,
    password: hex64.test(u.password) ? u.password : this.hashPassword(u.password),
  }));

  // Guardamos de vuelta si hubo cambios
  if (JSON.stringify(raw) !== JSON.stringify(normalized)) {
    this.saveUsers(normalized);
  }
  return normalized;
  }
  private saveUsers(users: AppUser[]) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  private hashPassword(password: string): string {
    return CryptoJS.SHA256(password).toString();
  }

  // ---- Registro ----
  register(user: AppUser): { ok: boolean; message?: string } {
    const users = this.loadUsers();
    const exists = users.some(u => u.email.toLowerCase() === user.email.toLowerCase());
    if (exists) return { ok: false, message: 'El email ya está registrado.' };
    user.password = this.hashPassword(user.password);
    users.push(user);
    this.saveUsers(users);
    return { ok: true };
  }

  // ---- Login ----
  login(email: string, password: string): { ok: boolean; message?: string } {
    email = email.trim();
    password = password.trim();

    const users = this.loadUsers();
const hashed = this.hashPassword(password);

    const found = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === hashed
    );
    if (!found) return { ok: false, message: 'Credenciales inválidas.' };

    localStorage.setItem(SESSION_KEY, JSON.stringify({ email: found.email }));
    return { ok: true };
  }

  // ---- Sesión ----
  isLoggedIn(): boolean {
    return !!localStorage.getItem(SESSION_KEY);
  }

  currentUser(): AppUser | null {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    if (!session) return null;
    const users = this.loadUsers();
    return users.find(u => u.email === session.email) || null;
  }

  logout() {
    localStorage.removeItem(SESSION_KEY);
    this.router.navigate(['/login']);
  }
}
