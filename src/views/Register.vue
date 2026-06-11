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
      <h1 class="text-4xl font-bold text-on-surface text-center">Create Account</h1>
      <p class="text-base text-on-surface-variant mt-2 text-center max-w-[280px]">
        Join us in making the planet cleaner, one pickup at a time.
      </p>
    </header>

    <!-- Main Register Content -->
    <main class="w-full max-w-md px-4 flex-grow">
      <form class="flex flex-col gap-6" @submit.prevent="handleRegister">

        <!-- Full Name -->
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-on-surface-variant ml-1">Full Name</label>
          <div class="relative rounded-xl transition-all">
            <input
              v-model="form.name"
              class="w-full bg-[#F1F5F9] border-none rounded-xl py-4 pl-12 pr-4 text-on-surface focus:ring-2 focus:ring-secondary transition-all outline-none"
              placeholder="Full name"
              required
              type="text"
            />
          </div>
        </div>

        <!-- Email -->
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-on-surface-variant ml-1">Email Address</label>
          <div class="relative rounded-xl transition-all">
            
            <input
              v-model="form.email"
              class="w-full bg-[#F1F5F9] border-none rounded-xl py-4 pl-12 pr-4 text-on-surface focus:ring-2 focus:ring-secondary transition-all outline-none"
              placeholder="name@example.com"
              required
              type="email"
            />
          </div>
        </div>

        <!-- Phone -->
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-on-surface-variant ml-1">Phone Number</label>
          <div class="relative rounded-xl transition-all">
            
            <input
              v-model="form.phone"
              class="w-full bg-[#F1F5F9] border-none rounded-xl py-4 pl-12 pr-4 text-on-surface focus:ring-2 focus:ring-secondary transition-all outline-none"
              placeholder="+1 555 000 0000"
              type="tel"
            />
          </div>
        </div>

        <!-- Password -->
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-on-surface-variant ml-1">Password</label>
          <div class="relative rounded-xl transition-all">
            
            <input
              v-model="form.password"
              class="w-full bg-[#F1F5F9] border-none rounded-xl py-4 pl-12 pr-12 text-on-surface focus:ring-2 focus:ring-secondary transition-all outline-none"
              placeholder="Min 8 characters"
              required
              minlength="8"
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

        <!-- Confirm Password -->
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium text-on-surface-variant ml-1">Confirm Password</label>
          <div class="relative rounded-xl transition-all">
            
            <input
              v-model="form.confirmPassword"
              class="w-full bg-[#F1F5F9] border-none rounded-xl py-4 pl-12 pr-4 text-on-surface focus:ring-2 focus:ring-secondary transition-all outline-none"
              placeholder="Re-enter your password"
              required
              minlength="8"
              :type="showPassword ? 'text' : 'password'"
            />
          </div>
          <p v-if="passwordMismatch" class="text-error text-xs ml-1">Passwords do not match</p>
        </div>

        <!-- Security Badge -->
        <div class="flex items-center gap-3 py-2 px-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
          <span class="material-symbols-outlined text-primary text-sm">verified_user</span>
          <span class="text-sm text-on-surface-variant">Your data is safe and encrypted</span>
        </div>

        <!-- Error Message -->
        <p v-if="auth.error" class="text-error text-sm text-center">{{ auth.error }}</p>

        <!-- Submit Button -->
        <button
          class="w-full bg-primary hover:bg-on-primary-fixed-variant text-white text-sm font-medium py-4 rounded-xl shadow-[0px_4px_20px_rgba(0,108,73,0.2)] active:scale-95 transition-all duration-200 mt-2 flex items-center justify-center gap-2"
          type="submit"
          :disabled="auth.loading"
        >
          {{ auth.loading ? 'Creating account...' : 'Create Account' }}
          <span class="material-symbols-outlined">arrow_forward</span>
        </button>
      </form>
    </main>

    <!-- Footer -->
    <footer class="w-full py-8 px-4 flex flex-col items-center">
      <div class="flex items-center gap-1 text-base text-on-surface-variant">
        <span>Already have an account?</span>
        <router-link class="text-primary font-semibold hover:underline transition-all" to="/login">Sign in</router-link>
      </div>
      <div class="mt-8 text-center max-w-[280px]">
        <p class="text-xs text-outline-variant">
          By registering, you agree to our
          <a class="underline" href="#">Terms of Service</a> and
          <a class="underline" href="#">Privacy Policy</a>.
        </p>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';

defineOptions({ name: 'RegisterView' })

const auth = useAuthStore();
const router = useRouter();
const showPassword = ref(false);

const form = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
});

const passwordMismatch = computed(() =>
  form.confirmPassword.length > 0 && form.password !== form.confirmPassword
);

const handleRegister = async () => {
  if (form.password !== form.confirmPassword) return;
  const { confirmPassword, ...payload } = form;
  await auth.register(payload);
  if (!auth.error) {
    router.push('/dashboard');
  }
};
</script>