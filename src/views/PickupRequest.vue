<template>
  <div
    class="bg-surface text-on-surface min-h-screen flex flex-col pb-24 md:pb-0">
    <!-- TopAppBar -->
    <header
      class="bg-surface shadow-[0px_4px_20px_rgba(14,165,233,0.08)] sticky top-0 z-50">
      <div
        class="flex justify-between items-center px-4 md:px-10 h-16 w-full max-w-[1280px] mx-auto">
        <div class="flex items-center gap-3">
          <button
            @click="router.push('/dashboard')"
            class="active:scale-95 transition-transform duration-200">
            <span class="material-symbols-outlined text-primary"
              >arrow_back</span
            >
          </button>
          <h1 class="text-2xl font-bold text-primary">PlasticIQ pickup</h1>
        </div>
        <div class="flex items-center gap-4">
          <nav class="hidden md:flex gap-6">
            <router-link
              to="/dashboard"
              class="text-sm text-on-surface-variant hover:text-secondary transition-colors"
              >Home</router-link
            >
            <router-link
              to="/request"
              class="text-sm font-semibold text-primary hover:text-secondary transition-colors"
              >Request</router-link
            >
          </nav>
          <div
            class="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
            {{ initials }}
          </div>
        </div>
      </div>
    </header>

    <main
      class="flex-grow flex flex-col max-w-[1280px] mx-auto w-full px-4 md:px-10 py-8 mb-24">
      <!-- Stepper -->
      <div
        v-if="!submitted"
        class="flex justify-between items-center mb-8 px-4">
        <div
          v-for="(label, index) in steps"
          :key="index"
          class="flex items-center flex-1">
          <div class="flex flex-col items-center gap-2">
            <div
              :class="stepIndicatorClass(index + 1)"
              class="w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300">
              <span
                v-if="currentStep > index + 1"
                class="material-symbols-outlined text-sm"
                >check</span
              >
              <span v-else>{{ index + 1 }}</span>
            </div>
            <span
              :class="
                currentStep === index + 1 ? 'text-primary' : 'text-outline'
              "
              class="text-xs font-semibold"
              >{{ label }}</span
            >
          </div>
          <div
            v-if="index < steps.length - 1"
            class="flex-grow h-[2px] bg-outline-variant mx-4 -mt-6"></div>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-8 flex-grow">
        <!-- Step 1: Location -->
        <div v-if="currentStep === 1 && !submitted" class="space-y-6">
          <div>
            <h2 class="text-2xl font-semibold text-on-surface mb-2">
              Where is the pickup?
            </h2>
            <p class="text-base text-on-surface-variant">
              Confirm your location for the collection team.
            </p>
          </div>
          <div class="space-y-4">
            <div class="relative">
              <span
                class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline"
                >location_on</span
              >
              <input
                v-model="form.address"
                class="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-secondary transition-all outline-none"
                placeholder="Enter pickup address"
                required
                type="text" />
            </div>
            <div class="relative">
              <span
                class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline"
                >person</span
              >
              <input
                v-model="form.pickup_name"
                class="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-secondary transition-all outline-none"
                placeholder="Contact name for pickup"
                type="text" />
            </div>
            <div class="relative">
              <span
                class="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline"
                >phone</span
              >
              <input
                v-model="form.phone"
                class="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-secondary transition-all outline-none"
                placeholder="Contact phone number"
                type="tel" />
            </div>
            <!-- Map placeholder — Google Maps integration Day 2 -->
            <div
              class="rounded-2xl overflow-hidden border border-outline-variant h-64 relative shadow-sm bg-surface-container-low flex items-center justify-center">
              <div class="text-center text-on-surface-variant">
                <span
                  class="material-symbols-outlined text-5xl text-outline mb-2 block"
                  >map</span
                >
                <p class="text-sm">Map integration coming soon</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: Details -->
        <div v-if="currentStep === 2 && !submitted" class="space-y-6">
          <div>
            <h2 class="text-2xl font-semibold text-on-surface mb-2">
              What are we collecting?
            </h2>
            <p class="text-base text-on-surface-variant">
              Identify the materials to ensure proper recycling processing.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-sm font-medium text-on-surface"
                >Plastic Type</label
              >
              <select
                v-model="form.plastic_type"
                class="w-full p-4 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-secondary transition-all outline-none">
                <option value="">Select plastic type</option>
                <option value="PET">PET (Water bottles, soda bottles)</option>
                <option value="HDPE">HDPE (Milk jugs, shampoo bottles)</option>
                <option value="PVC">PVC (Pipes, window frames)</option>
                <option value="LDPE">
                  LDPE (Shopping bags, flexible films)
                </option>
                <option value="PP">PP (Food containers, caps)</option>
                <option value="Mixed">Mixed plastics</option>
              </select>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-on-surface"
                >Estimated Quantity</label
              >
              <select
                v-model="form.quantity"
                class="w-full p-4 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-secondary transition-all outline-none">
                <option value="">Select quantity</option>
                <option value="Small (Under 5kg)">Small Bag (Under 5kg)</option>
                <option value="Medium (5-15kg)">Medium Box (5-15kg)</option>
                <option value="Large (15-30kg)">Large Sack (15-30kg)</option>
                <option value="Bulk (30kg+)">
                  Bulk / Multiple Sacks (30kg+)
                </option>
              </select>
            </div>
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium text-on-surface"
              >Additional Notes</label
            >
            <textarea
              v-model="form.notes"
              class="w-full p-4 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-secondary transition-all outline-none resize-none"
              placeholder="Any special instructions for the collection agent..."
              rows="4"></textarea>
          </div>
          <div
            class="p-6 bg-secondary-container/20 rounded-2xl border border-secondary-container/30">
            <div class="flex items-start gap-4">
              <span class="material-symbols-outlined text-secondary text-3xl"
                >info</span
              >
              <div>
                <p class="text-base font-semibold text-on-secondary-container">
                  Pro Tip
                </p>
                <p class="text-sm text-on-secondary-container">
                  Rinse your plastics and remove labels for faster processing!
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3: Schedule -->
        <div v-if="currentStep === 3 && !submitted" class="space-y-6">
          <div>
            <h2 class="text-2xl font-semibold text-on-surface mb-2">
              Preferred Timing
            </h2>
            <p class="text-base text-on-surface-variant">
              Select a date that fits your schedule.
            </p>
          </div>
          <div class="space-y-4">
            <div class="space-y-2">
              <label class="text-sm font-medium text-on-surface"
                >Preferred Date</label
              >
              <input
                v-model="form.preferred_date"
                class="w-full p-4 bg-surface-container-low border-none rounded-xl focus:ring-2 focus:ring-secondary transition-all outline-none"
                type="date"
                :min="today" />
            </div>
          </div>

          <!-- Error -->
          <p v-if="error" class="text-error text-sm text-center">{{ error }}</p>
        </div>

        <!-- Success State -->
        <div v-if="submitted" class="py-12 text-center">
          <div
            class="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary-container text-on-primary-container mb-6 shadow-xl">
            <span class="material-symbols-outlined text-5xl">check_circle</span>
          </div>
          <h2 class="text-4xl font-bold text-on-surface mb-4">
            Request Confirmed!
          </h2>
          <p class="text-lg text-on-surface-variant max-w-md mx-auto mb-10">
            Your pickup has been scheduled. An agent will contact you to confirm
            the collection.
          </p>
          <div
            class="bg-surface-container-high p-6 rounded-2xl max-w-sm mx-auto mb-10">
            <p
              class="text-xs font-semibold text-secondary uppercase tracking-widest mb-2">
              Status
            </p>
            <p class="text-2xl font-bold text-on-surface">Pending Approval</p>
          </div>
          <button
            @click="router.push('/dashboard')"
            class="px-10 py-4 bg-primary text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform active:scale-95"
            type="button">
            Back to Dashboard
          </button>
        </div>

        <!-- Navigation Buttons -->
        <div v-if="!submitted" class="flex items-center gap-4 pt-8">
          <button
            v-if="currentStep > 1"
            @click="currentStep--"
            class="flex-1 px-6 py-4 border border-secondary text-secondary rounded-full font-bold active:scale-95 transition-all"
            type="button">
            Back
          </button>
          <button
            v-if="currentStep < 3"
            @click="nextStep"
            class="flex-1 px-6 py-4 bg-primary text-white rounded-full font-bold shadow-lg active:scale-95 transition-all"
            type="button">
            Continue
          </button>
          <button
            v-if="currentStep === 3"
            class="flex-1 px-6 py-4 bg-primary text-white rounded-full font-bold shadow-lg active:scale-95 transition-all"
            type="submit"
            :disabled="loading">
            {{ loading ? "Submitting..." : "Submit Request" }}
          </button>
        </div>
      </form>
    </main>

    <!-- Footer (Desktop) -->
    <footer
      class="hidden md:flex w-full mt-auto bg-surface-container-low border-t border-outline-variant py-8 px-10 flex-row justify-between items-center gap-4">
      <p class="text-sm text-on-surface-variant">
        © 2024 PlasticIQ pickup. All rights reserved.
      </p>
      <div class="flex gap-6">
        <a
          class="text-sm text-on-surface-variant hover:text-secondary transition-colors"
          href="#"
          >Privacy Policy</a
        >
        <a
          class="text-sm text-on-surface-variant hover:text-secondary transition-colors"
          href="#"
          >Contact Support</a
        >
      </div>
    </footer>

    <!-- Bottom Nav (Mobile) -->
    <nav
      class="fixed bottom-0 left-0 w-full bg-surface-container-lowest shadow-lg flex justify-around items-center py-2 px-4 md:hidden z-50 rounded-t-xl">
      <router-link
        to="/dashboard"
        class="flex flex-col items-center justify-center text-on-surface-variant">
        <span class="material-symbols-outlined">home</span>
        <span class="text-xs font-semibold">Home</span>
      </router-link>
      <router-link
        to="/request"
        class="flex flex-col items-center justify-center bg-primary/10 text-primary rounded-full px-4 py-1">
        <span class="material-symbols-outlined">add_circle</span>
        <span class="text-xs font-semibold">Request</span>
      </router-link>
      <router-link
        to="/history"
        class="flex flex-col items-center justify-center text-on-surface-variant">
        <span class="material-symbols-outlined">history</span>
        <span class="text-xs font-semibold">History</span>
      </router-link>
      <router-link
        to="/dashboard"
        class="flex flex-col items-center justify-center text-on-surface-variant">
        <span class="material-symbols-outlined">person</span>
        <span class="text-xs font-semibold">Profile</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth.store";
import api from "../api";

defineOptions({ name: "PickupRequestView" });

const auth = useAuthStore();
const router = useRouter();

const currentStep = ref(1);
const submitted = ref(false);
const loading = ref(false);
const error = ref(null);

const steps = ["Location", "Details", "Schedule"];

const today = new Date().toISOString().split("T")[0];

const form = reactive({
  address: "",
  pickup_name: "",
  phone: "",
  plastic_type: "",
  quantity: "",
  notes: "",
  preferred_date: "",
  lat: null,
  lng: null,
});

const initials = computed(() => {
  if (!auth.user?.name) return "?";
  return auth.user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
});

const stepIndicatorClass = (step) => {
  if (step < currentStep.value)
    return "bg-primary-container text-on-primary-container";
  if (step === currentStep.value) return "bg-primary text-white shadow-lg";
  return "bg-surface-variant text-on-surface-variant";
};

const nextStep = () => {
  if (currentStep.value === 1 && !form.address) {
    error.value = "Please enter a pickup address";
    return;
  }
  error.value = null;
  currentStep.value++;
};

const handleSubmit = async () => {
  loading.value = true;
  error.value = null;
  try {
    await api.post("/pickup", form);
    submitted.value = true;
  } catch (err) {
    error.value =
      err.response?.data?.message ||
      "Failed to submit request. Please try again.";
      console.log(err)
  } finally {
    loading.value = false;
  }
};
</script>
