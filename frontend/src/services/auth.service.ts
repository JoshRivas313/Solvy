import { apiFetch } from "@/lib/api";

export const authService = {
  async login(credentials: { email: string; password: string }) {
    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    if (data.token) {
      localStorage.setItem('solvy_token', data.token);
      localStorage.setItem('solvy_user', JSON.stringify(data));
    }
    return data;
  },

  async register(userData: { fullName: string; email: string; password: string }) {
    const data = await apiFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    // Supabase puede requerir confirmación de email
    if (data.requiresConfirmation) {
      throw new Error('Revisa tu correo para confirmar tu cuenta antes de iniciar sesión.');
    }
    if (data.token) {
      localStorage.setItem('solvy_token', data.token);
      localStorage.setItem('solvy_user', JSON.stringify(data));
    }
    return data;
  },

  logout() {
    localStorage.removeItem('solvy_token');
    localStorage.removeItem('solvy_user');
  },

  getCurrentUser() {
    const user = localStorage.getItem('solvy_user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('solvy_token');
  }
};
