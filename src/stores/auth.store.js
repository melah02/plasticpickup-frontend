import { defineStore } from 'pinia';
import api from '../api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin',
  },

  actions: {
    async register(payload) {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await api.post('/auth/register', payload);
        this.token = data.token;
        this.user = data.user;
        localStorage.setItem('token', data.token);
      } catch (err) {
        this.error = err.response?.data?.message || 'Registration failed';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async login(payload) {
      this.loading = true;
      this.error = null;
      try {
        const { data } = await api.post('/auth/login', payload);
        this.token = data.token;
        this.user = data.user;
        localStorage.setItem('token', data.token);
      } catch (err) {
        this.error = err.response?.data?.message || 'Login failed';
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async fetchProfile() {
      try {
        const { data } = await api.get('/auth/profile');
        this.user = data;
      } catch {
        this.logout();
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
    },
  },
});