<template>
  <div class="font-body-md text-on-surface flex min-h-screen">

    <!-- Sidebar -->
    <aside
      class="h-screen w-64 fixed left-0 top-0 bg-surface-container-low border-r border-outline-variant flex flex-col py-2 px-4">
      <div class="mb-8 px-2 mt-4">
        <h1 class="text-2xl font-bold text-primary">PlasticIQ pickup</h1>
        <p class="text-sm text-on-surface-variant">Admin Suite</p>
      </div>
      <nav class="flex-grow space-y-1">
        <a class="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-bold"
          href="#">
          <span class="material-symbols-outlined">dashboard</span>
          <span class="text-sm">Dashboard</span>
        </a>
        <a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-colors"
          href="#">
          <span class="material-symbols-outlined">local_shipping</span>
          <span class="text-sm">Pickups</span>
        </a>
        <a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-colors"
          href="#">
          <span class="material-symbols-outlined">analytics</span>
          <span class="text-sm">Reports</span>
        </a>
        <a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-colors"
          href="#">
          <span class="material-symbols-outlined">settings</span>
          <span class="text-sm">Settings</span>
        </a>
      </nav>
      <div class="pt-4 border-t border-outline-variant space-y-1">
        <button @click="handleLogout"
          class="w-full flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-lg transition-colors">
          <span class="material-symbols-outlined">logout</span>
          <span class="text-sm">Sign Out</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="ml-64 min-h-screen flex-1">

      <!-- Header -->
      <header
        class="h-16 sticky top-0 bg-surface/80 backdrop-blur-md z-10 px-10 flex items-center justify-between border-b border-outline-variant/30">
        <h2 class="text-2xl font-semibold text-on-surface">Overview</h2>
        <div class="flex items-center gap-4">
          <div class="relative">
            <span class="absolute inset-y-0 left-3 flex items-center text-outline">
              <span class="material-symbols-outlined">search</span>
            </span>
            <input v-model="search"
              class="pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20"
              placeholder="Search requests..." type="text" />
          </div>
          <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
            {{ initials }}
          </div>
        </div>
      </header>

      <!-- Content Body -->
      <div class="p-10 space-y-8">

        <!-- KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            class="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all">
            <div class="flex justify-between items-start mb-4">
              <div class="p-3 bg-primary/10 rounded-lg text-primary">
                <span class="material-symbols-outlined">group</span>
              </div>
            </div>
            <h3 class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Total Users</h3>
            <p class="text-3xl font-bold text-on-surface mt-1">{{ stats.totalUsers }}</p>
          </div>
          <div
            class="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all">
            <div class="flex justify-between items-start mb-4">
              <div class="p-3 bg-secondary/10 rounded-lg text-secondary">
                <span class="material-symbols-outlined">schedule</span>
              </div>
              <span class="text-error font-bold text-xs">Needs action</span>
            </div>
            <h3 class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Pending Requests</h3>
            <p class="text-3xl font-bold text-on-surface mt-1">{{ stats.pending }}</p>
          </div>
          <div
            class="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm hover:shadow-md transition-all">
            <div class="flex justify-between items-start mb-4">
              <div class="p-3 bg-primary/10 rounded-lg text-primary">
                <span class="material-symbols-outlined">check_circle</span>
              </div>
            </div>
            <h3 class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Completed Pickups</h3>
            <p class="text-3xl font-bold text-on-surface mt-1">{{ stats.completed }}</p>
          </div>
        </div>

        <!-- Requests Table -->
        <div class="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
          <div class="p-6 border-b border-outline-variant flex justify-between items-center">
            <div>
              <h3 class="text-2xl font-semibold text-on-surface">Pickup Requests</h3>
              <p class="text-sm text-on-surface-variant">All requests requiring action</p>
            </div>
          </div>

          <!-- Loading -->
          <div v-if="loading" class="p-12 text-center text-on-surface-variant">
            <span class="material-symbols-outlined text-4xl block mb-2">hourglass_empty</span>
            Loading requests...
          </div>

          <!-- Empty -->
          <div v-else-if="filteredRequests.length === 0" class="p-12 text-center text-on-surface-variant">
            <span class="material-symbols-outlined text-4xl block mb-2">inbox</span>
            No requests found.
          </div>

          <!-- Table -->
          <div v-else class="overflow-x-auto">
            <table class="w-full text-left">
              <thead
                class="bg-surface-container-low text-on-surface-variant text-xs font-semibold uppercase tracking-wider">
                <tr>
                  <th class="px-6 py-4">User</th>
                  <th class="px-6 py-4">Address</th>
                  <th class="px-6 py-4">Date</th>
                  <th class="px-6 py-4">Plastic Type</th>
                  <th class="px-6 py-4">Status</th>
                  <th class="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-outline-variant/30">
                <tr v-for="request in filteredRequests" :key="request.id"
                  class="hover:bg-surface-container-low/50 transition-colors">
                  <td class="px-6 py-4">
                    <div class="flex flex-col">
                      <span class="font-semibold text-on-surface">{{ request.user_name }}</span>
                      <span class="text-xs text-outline">{{ request.user_email }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm text-on-surface max-w-[200px] truncate">{{ request.address }}</td>
                  <td class="px-6 py-4 text-sm text-on-surface-variant">{{ formatDate(request.preferred_date) }}</td>
                  <td class="px-6 py-4 text-sm text-on-surface">{{ request.plastic_type || '—' }}</td>
                  <td class="px-6 py-4">
                    <span :class="statusClass(request.status)" class="px-3 py-1 rounded-full text-xs font-bold border">
                      {{ request.status.toUpperCase() }}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex gap-2">
                      <button v-if="request.status === 'pending'" @click="updateStatus(request.id, 'approved')"
                        class="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Approve">
                        <span class="material-symbols-outlined">check_circle</span>
                      </button>
                      <button v-if="['pending', 'approved'].includes(request.status)"
                        @click="updateStatus(request.id, 'completed')"
                        class="p-2 text-secondary hover:bg-secondary/10 rounded-lg transition-colors"
                        title="Mark Completed">
                        <span class="material-symbols-outlined">done_all</span>
                      </button>
                      <button v-if="['pending', 'approved'].includes(request.status)"
                        @click="updateStatus(request.id, 'cancelled')"
                        class="p-2 text-error hover:bg-error/10 rounded-lg transition-colors" title="Cancel">
                        <span class="material-symbols-outlined">cancel</span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Chart -->
        <div class="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm p-8">
          <h3 class="text-2xl font-semibold text-on-surface mb-6">Monthly Requests</h3>
          <div class="h-48 flex items-end justify-between gap-2 px-4">
            <div v-for="(bar, index) in chartBars" :key="index" class="flex flex-col items-center flex-1 group">
              <div :style="{ height: bar.height }"
                :class="bar.active ? 'bg-primary' : 'bg-primary/20 group-hover:bg-primary/40'"
                class="w-full rounded-t-lg transition-all duration-500"></div>
              <span class="text-[10px] font-bold text-outline mt-2">{{ bar.label }}</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Footer -->
      <footer
        class="bg-surface-container-highest border-t border-outline-variant py-8 px-10 flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
        <p class="text-sm text-on-surface-variant">© 2024 PlasticIQ pickup. All rights reserved.</p>
        <div class="flex gap-6">
          <a class="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Privacy Policy</a>
          <a class="text-sm text-on-surface-variant hover:text-secondary transition-colors" href="#">Contact Support</a>
        </div>
      </footer>

    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import api from '../api';

defineOptions({ name: 'AdminDashboardView' })

const auth = useAuthStore();
const router = useRouter();
const requests = ref([]);
const loading = ref(true);
const search = ref('');

const initials = computed(() => {
  if (!auth.user?.name) return 'A';
  return auth.user.name.split(' ').map(n => n[0]).join('').toUpperCase();
});

const stats = computed(() => ({
  totalUsers: new Set(requests.value.map(r => r.user_id)).size,
  pending: requests.value.filter(r => r.status === 'pending').length,
  completed: requests.value.filter(r => r.status === 'completed').length,
}));

const filteredRequests = computed(() => {
  if (!search.value) return requests.value;
  const q = search.value.toLowerCase();
  return requests.value.filter(r =>
    r.user_name?.toLowerCase().includes(q) ||
    r.address?.toLowerCase().includes(q) ||
    r.status?.toLowerCase().includes(q)
  );
});

const formatDate = (date) => {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const statusClass = (status) => {
  const map = {
    pending: 'bg-secondary-container/20 text-on-secondary-container border-secondary-container/30',
    approved: 'bg-primary/20 text-primary border-primary/30',
    assigned: 'bg-secondary/20 text-secondary border-secondary/30',
    collected: 'bg-primary-container/20 text-on-primary-container border-primary-container/30',
    completed: 'bg-primary/20 text-primary border-primary/30',
    cancelled: 'bg-error-container/20 text-on-error-container border-error-container/30',
  };
  return map[status] || 'bg-surface-variant text-on-surface-variant border-outline-variant';
};

const chartBars = [
  { label: 'JAN', height: '40%', active: false },
  { label: 'FEB', height: '55%', active: false },
  { label: 'MAR', height: '48%', active: false },
  { label: 'APR', height: '65%', active: false },
  { label: 'MAY', height: '72%', active: false },
  { label: 'JUN', height: '60%', active: false },
  { label: 'JUL', height: '85%', active: false },
  { label: 'AUG', height: '92%', active: false },
  { label: 'SEP', height: '98%', active: true },
  { label: 'OCT', height: '30%', active: false },
];

const updateStatus = async (id, status) => {
  try {
    let endpoint;
    if (status === 'approved') endpoint = 'approve';
    else if (status === 'cancelled') endpoint = 'reject';
    else if (status === 'completed') endpoint = 'complete';
    else endpoint = status;

    await api.patch(`/admin/requests/${id}/${endpoint}`);
    const index = requests.value.findIndex(r => r.id === id);
    if (index !== -1) requests.value[index].status = status;

    if (status === 'completed') {
      console.log('Pickup completed, points awarded');
    }
  } catch (err) {
    console.error('Failed to update status:', err);
  }
};

onMounted(async () => {
  try {
    const { data } = await api.get('/admin/requests');
    requests.value = data;
  } catch (err) {
    console.error('Failed to load requests:', err);
  } finally {
    loading.value = false;
  }
});

const handleLogout = () => {
  auth.logout();
  router.push('/login');
};
</script>