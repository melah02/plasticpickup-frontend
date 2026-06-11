<template>
  <div class="min-h-screen flex flex-col justify-between items-center bg-surface">

    <!-- Background Decorative Elements -->
    <div class="fixed top-[-10%] left-[-10%] w-[40%] h-[30%] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
    <div class="fixed bottom-[-5%] right-[-5%] w-[50%] h-[40%] bg-secondary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

    <!-- Top Branding -->
    <header class="w-full flex flex-col items-center pt-16 pb-8 px-4">
      <div class="flex items-center gap-2 mb-6">
        <div class="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg active:scale-95 transition-transform duration-200">
          <span class="material-symbols-outlined text-white text-3xl">recycling</span>
        </div>
        <span class="text-2xl font-bold text-primary">PlasticPickup</span>
      </div>
      <h1 class="text-4xl font-bold text-on-surface text-center">Welcome Back</h1>
      <p class="text-base text-on-surface-variant mt-2 text-center max-w-[280px]">
        Log in to continue your journey toward a sustainable planet.
      </p>
    </header>

    <!-- Main Login Content -->
    <main class="w-full max-w-md px-4 flex-grow">
      <form class="flex flex-col gap-6" @submit.prevent="handleLogin">

        <!-- Email Input -->
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-on-surface-variant ml-1" for="email">Email Address</label>
          <div class="relative rounded-xl transition-all">
            <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span class="material-symbols-outlined text-outline">mail</span>
            </div>
            <input
              v-model="form.email"
              class="w-full bg-[#F1F5F9] border-none rounded-xl py-4 pl-12 pr-4 text-on-surface focus:ring-2 focus:ring-secondary transition-all outline-none"
              id="email"
              placeholder="name@example.com"
              required
              type="email"
            />
          </div>
        </div>

        <!-- Password Input -->
        <div class="flex flex-col gap-2">
          <div class="flex justify-between items-center">
            <label class="text-sm font-medium text-on-surface-variant ml-1" for="password">Password</label>
            <a class="text-xs font-semibold text-secondary hover:underline transition-colors" href="#">Forgot Password?</a>
          </div>
          <div class="relative rounded-xl transition-all">
            <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <span class="material-symbols-outlined text-outline">lock</span>
            </div>
            <input
              v-model="form.password"
              class="w-full bg-[#F1F5F9] border-none rounded-xl py-4 pl-12 pr-12 text-on-surface focus:ring-2 focus:ring-secondary transition-all outline-none"
              id="password"
              placeholder="••••••••"
              required
              :type="showPassword ? 'text' : 'password'"
            />
            <button
              class="absolute inset-y-0 right-4 flex items-center text-outline hover:text-on-surface transition-colors"
              type="button"
              @click="showPassword = !showPassword"
            >
              <span class="material-symbols-outlined">{{ showPassword ? 'visibility_off' : 'visibility' }}</span>
            </button>
          </div>
        </div>

        <!-- Security Badge -->
        <div class="flex items-center gap-3 py-2 px-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
          <span class="material-symbols-outlined text-primary text-sm">verified_user</span>
          <span class="text-sm text-on-surface-variant">Secure, end-to-end encrypted login</span>
        </div>

        <!-- Error Message -->
        <p v-if="auth.error" class="text-error text-sm text-center">{{ auth.error }}</p>

        <!-- Submit Button -->
        <button
          class="w-full bg-primary hover:bg-on-primary-fixed-variant text-white text-sm font-medium py-4 rounded-xl shadow-[0px_4px_20px_rgba(0,108,73,0.2)] active:scale-95 transition-all duration-200 mt-2 flex items-center justify-center gap-2"
          type="submit"
          :disabled="auth.loading"
        >
          {{ auth.loading ? 'Signing in...' : 'Login' }}
          <span class="material-symbols-outlined">arrow_forward</span>
        </button>
      </form>

      <!-- Social Auth -->
      <div class="mt-10 flex flex-col items-center">
        <div class="w-full flex items-center gap-4 mb-8">
          <div class="h-px bg-outline-variant flex-grow"></div>
          <span class="text-xs font-semibold text-outline">OR CONTINUE WITH</span>
          <div class="h-px bg-outline-variant flex-grow"></div>
        </div>
        <div class="flex gap-4 w-full">
          <button class="flex-1 flex items-center justify-center py-3 border border-outline-variant rounded-xl hover:bg-surface-container transition-colors active:scale-95" type="button">
            <img alt="Google" class="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1mSQ9ZjhT66swOY4g0cKma4ojxl6fNKS-hEMdavRQyYIEZlLQeBXFAi1xJCM2WZqPTfycSfq44T9LJkv3kw0s0TZmxHUWAa23jOuDgfkwcmBLdO9dHsY86rhFLEF1OIHpr_pu-bI4QL3mdAXrrWatsyAYtbsT5ZIhyUUd_8YYHI54CEK_is1EHQYBl2g-N9B4cDtKhbpipYbS0A8dEQdEu6emWxVpGNzjzcgR-ME7FGbfywF8QJZbRMDrojY-fAkqNkv_-6bTFSE"/>
          </button>
          <button class="flex-1 flex items-center justify-center py-3 border border-outline-variant rounded-xl hover:bg-surface-container transition-colors active:scale-95" type="button">
            <span class="material-symbols-outlined text-[#1877F2]">face</span>
          </button>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="w-full py-8 px-4 flex flex-col items-center">
      <div class="flex items-center gap-1 text-base text-on-surface-variant">
        <span>New to PlasticPickup?</span>
        <router-link class="text-primary font-semibold hover:underline transition-all" to="/register">Create an Account</router-link>
      </div>
      <div class="mt-8 text-center max-w-[280px]">
        <p class="text-xs text-outline-variant">
          By logging in, you agree to our
          <a class="underline" href="#">Terms of Service</a> and
          <a class="underline" href="#">Privacy Policy</a>.
        </p>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';

defineOptions({ name: 'LoginView' })

const auth = useAuthStore();
const router = useRouter();
const showPassword = ref(false);
const form = reactive({ email: '', password: '' });

const handleLogin = async () => {
  await auth.login(form);
  if (!auth.error) {
    router.push(auth.isAdmin ? '/admin' : '/dashboard');
  }
};
</script>