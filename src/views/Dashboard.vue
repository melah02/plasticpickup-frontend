<template>
  <div class="bg-surface text-on-surface min-h-screen pb-24 md:pb-0">
    <!-- TopAppBar -->
    <header class="bg-surface shadow-[0px_4px_20px_rgba(14,165,233,0.08)] top-0 sticky z-50">
      <div class="flex justify-between items-center px-4 md:px-10 h-16 w-full max-w-[1280px] mx-auto">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-primary text-3xl">recycling</span>
          <h1 class="text-2xl font-bold text-primary">PlasticIQ pickup</h1>
        </div>
        <div class="flex items-center gap-4">
          <nav class="hidden md:flex gap-8 items-center">
            <router-link to="/dashboard"
              class="text-sm font-semibold text-primary hover:text-secondary transition-colors">Home</router-link>
            <router-link to="/request"
              class="text-sm text-on-surface-variant hover:text-secondary transition-colors">Request</router-link>
            <router-link to="/history"
              class="text-sm text-on-surface-variant hover:text-secondary transition-colors">History</router-link>
          </nav>
          <div class="flex items-center gap-2">
            <div
              class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
              {{ initials }}
            </div>
            <button @click="handleLogout"
              class="hidden md:block text-sm text-on-surface-variant hover:text-error transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="max-w-[1280px] mx-auto px-4 md:px-10 py-8 md:py-12">
      <!-- Greeting -->
      <section class="mb-10">
        <h2 class="text-4xl md:text-5xl font-bold text-on-surface mb-2">
          Hello, {{ auth.user?.name }}!
        </h2>
        <p class="text-lg text-on-surface-variant">
          Track and manage your PlasticIQ pickup requests.
        </p>
      </section>

      <!-- Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
        <!-- Request New Pickup CTA -->
        <router-link to="/request"
          class="md:col-span-7 lg:col-span-8 group cursor-pointer active:scale-95 transition-transform duration-200">
          <div
            class="relative overflow-hidden rounded-xl bg-primary-container h-full min-h-[300px] flex flex-col justify-end p-8 shadow-sm border border-outline-variant/20">
            <div class="absolute inset-0 opacity-20 mix-blend-overlay">
              <img alt="Recycling background" class="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd2B2wkUGVuG_cdlNErWca04gw4b5OOV3gwebe_BDGiPj79QlQGdJWkcpmeZKZZNbmIz-0tiqDeJpOIHmpeAnVd2kVeKCzJs7_mG3I5ZMxB1gFrjzDCHIgqI1EWjEeDK0P9QK72YCnq6Jpg4LVsdhOxgNVjTzEiXcKFJcUHRE8IX7whJyAd6np9Vy7iDM7N_1cHjaCpp0DnfbfqacFhtcvLRfEBkZ7XIWjJbkRPVd3litBj3qSZda5FxWG41LcfsfjUkcRQCjBkXk" />
            </div>
            <div class="relative z-10">
              <span class="material-symbols-outlined text-on-primary-container text-5xl mb-4"
                style="font-variation-settings: &quot;FILL&quot; 1">add_circle</span>
              <h3 class="text-2xl font-semibold text-on-primary-container mb-2">
                Request New Pickup
              </h3>
              <p class="text-base text-on-primary-container/80 max-w-md">
                Schedule a professional collection for your sorted plastic
                waste. We'll be there within 24 hours.
              </p>
            </div>
          </div>
        </router-link>


        <!-- Stats Column -->
        <!-- Stats Column -->
        <div class="md:col-span-5 lg:col-span-4 flex flex-col gap-6">
          <div
            class="bg-surface-container-low rounded-xl p-6 border border-outline-variant/30 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start mb-4">
              <span class="material-symbols-outlined text-secondary text-3xl">auto_awesome</span>
            </div>
            <h4 class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Total Requests</h4>
            <p class="text-4xl font-bold text-on-surface">{{ requests.length }}</p>
          </div>
          <div
            class="bg-surface-container-low rounded-xl p-6 border border-outline-variant/30 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start mb-4">
              <span class="material-symbols-outlined text-primary text-3xl">local_shipping</span>
            </div>
            <h4 class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Completed Pickups
            </h4>
            <p class="text-4xl font-bold text-on-surface">{{ completed }}</p>
          </div>
          <div class="bg-surface-container-low rounded-xl p-6 border border-outline-variant/30 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start mb-4">
              <span class="material-symbols-outlined text-primary text-3xl">stars</span>
              <span class="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Reward Points</span>
            </div>
            <h4 class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Total Points</h4>
            <p class="text-4xl font-bold text-black">{{ auth.user?.points || 0 }}</p>
            <p class="text-xs text-gray-500 mt-2">Earned from completed pickups</p>
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="md:col-span-12 mt-4">
          <div class="flex justify-between items-end mb-6">
            <div>
              <h3 class="text-2xl font-semibold text-on-surface">
                Recent Activity
              </h3>
              <p class="text-sm text-on-surface-variant">
                Track the status of your latest requests
              </p>
            </div>
            <router-link to="/history" class="text-primary text-sm font-medium hover:underline">View
              History</router-link>
          </div>

          <!-- No requests state -->
          <div v-if="!requests.length"
            class="text-center py-16 bg-surface-container-low rounded-xl border border-outline-variant/30">
            <span class="material-symbols-outlined text-5xl text-outline mb-4 block">inbox</span>
            <p class="text-on-surface-variant text-base">
              No pickup requests yet.
            </p>
            <router-link to="/request"
              class="mt-4 inline-block bg-primary text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-primary/90 transition-all">
              Schedule your first pickup
            </router-link>
          </div>

          <!-- Request cards -->
          <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="request in requests.slice(0, 3)" :key="request.id"
              class="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm hover:border-primary transition-colors">
              <div class="flex justify-between items-center mb-4">
                <span :class="statusClass(request.status)"
                  class="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  {{ request.status }}
                </span>
                <span class="text-on-surface-variant text-xs">{{
                  formatDate(request.created_at)
                }}</span>
              </div>
              <h4 class="text-base font-semibold mb-1">
                {{ request.address }}
              </h4>
              <p class="text-sm text-on-surface-variant mb-4">
                {{ request.plastic_type || "Mixed plastic" }} —
                {{ request.quantity || "N/A" }}
              </p>
              <div class="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                <div :class="progressClass(request.status)" class="h-full rounded-full transition-all duration-500"
                  :style="{ width: progressWidth(request.status) }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer (Desktop only) -->
    <footer
      class="hidden md:flex w-full mt-auto bg-surface-container-low border-t border-outline-variant py-8 px-10 flex-col md:flex-row justify-between items-center gap-4">
      <div class="text-xl font-bold text-primary">PlasticIQ pickup</div>
      <div class="flex gap-6">
        <a class="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Privacy Policy</a>
        <a class="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Terms of Service</a>
        <a class="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Contact Support</a>
      </div>
      <p class="text-sm text-on-surface-variant">
        © 2024 PlasticIQ pickup. All rights reserved.
      </p>
    </footer>

    <!-- Bottom Nav (Mobile only) -->
    <nav
      class="fixed bottom-0 left-0 w-full flex justify-around items-center py-2 px-4 md:hidden bg-surface-container-lowest shadow-lg z-50 rounded-t-xl">
      <router-link to="/dashboard"
        class="flex flex-col items-center justify-center bg-primary/10 text-primary rounded-full px-4 py-1 active:scale-90 transition-all duration-150">
        <span class="material-symbols-outlined" style="font-variation-settings: &quot;FILL&quot; 1">home</span>
        <span class="text-xs font-semibold">Home</span>
      </router-link>
      <router-link to="/request"
        class="flex flex-col items-center justify-center text-on-surface-variant active:scale-90 transition-all duration-150">
        <span class="material-symbols-outlined">add_circle</span>
        <span class="text-xs font-semibold">Request</span>
      </router-link>
      <router-link to="/history"
        class="flex flex-col items-center justify-center text-on-surface-variant active:scale-90 transition-all duration-150">
        <span class="material-symbols-outlined">history</span>
        <span class="text-xs font-semibold">History</span>
      </router-link>
      <button @click="handleLogout"
        class="flex flex-col items-center justify-center text-on-surface-variant active:scale-90 transition-all duration-150">
        <span class="material-symbols-outlined">person</span>
        <span class="text-xs font-semibold">Logout</span>
      </button>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.store";
import api from "../api";

defineOptions({ name: "DashboardView" });

const auth = useAuthStore();
const router = useRouter();
const requests = ref([]);

const initials = computed(() => {
  if (!auth.user?.name) return "?";
  return auth.user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
});

const completed = computed(
  () => requests.value.filter((r) => r.status === "completed").length,
);

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const statusClass = (status) => {
  const map = {
    pending: "bg-surface-variant text-on-surface-variant",
    approved: "bg-secondary-container/20 text-on-secondary-container",
    assigned: "bg-secondary-container/20 text-on-secondary-container",
    collected: "bg-primary-container/20 text-on-primary-container",
    completed: "bg-primary-container/20 text-on-primary-container",
    cancelled: "bg-error-container text-on-error-container",
  };
  return map[status] || "bg-surface-variant text-on-surface-variant";
};

const progressClass = (status) => {
  const map = {
    pending: "bg-outline",
    approved: "bg-secondary",
    assigned: "bg-secondary",
    collected: "bg-primary",
    completed: "bg-primary",
    cancelled: "bg-error",
  };
  return map[status] || "bg-outline";
};

const progressWidth = (status) => {
  const map = {
    pending: "20%",
    approved: "40%",
    assigned: "60%",
    collected: "80%",
    completed: "100%",
    cancelled: "100%",
  };
  return map[status] || "0%";
};

onMounted(async () => {
  try {
    await auth.fetchProfile();
    const { data } = await api.get('/pickup/user');
    requests.value = data;
  } catch {
    requests.value = [];
  }
});

const handleLogout = () => {
  auth.logout();
  router.push("/login");
};
</script>
