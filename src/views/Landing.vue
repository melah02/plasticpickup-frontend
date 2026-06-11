<template>
  <div class="bg-background text-on-background font-body-md overflow-x-hidden">
    <!-- TopAppBar -->
    <header
      class="bg-surface shadow-[0px_4px_20px_rgba(14,165,233,0.08)] top-0 sticky z-50">
      <div
        class="flex justify-between items-center px-4 md:px-10 h-16 w-full max-w-[1280px] mx-auto">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-3xl"
            >recycling</span
          >
          <span class="text-2xl font-bold text-primary">PlasticPickup</span>
        </div>
        <div class="flex items-center gap-4">
          <router-link
            to="/login"
            class="text-sm font-medium text-primary px-4 py-2 hover:text-secondary transition-colors"
            >Login</router-link
          >
          <router-link
            to="/register"
            class="hidden md:block bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary/90 transition-all"
            >Get Started</router-link
          >
        </div>
      </div>
    </header>

    <main>
      <!-- Hero Section -->
      <section class="relative pt-12 pb-20 px-4 overflow-hidden">
        <div
          class="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="z-10 text-center lg:text-left">
            <span
              class="inline-block px-4 py-1.5 mb-6 bg-secondary-container text-on-secondary-container rounded-full text-xs font-semibold tracking-wider uppercase"
              >Future-Proof Logistics</span
            >
            <h1
              class="text-4xl md:text-5xl font-bold text-on-surface mb-6 leading-tight">
              Turn Plastic Waste into <span class="text-primary">Progress</span>
            </h1>
            <p
              class="text-lg text-on-surface-variant mb-10 max-w-xl mx-auto lg:mx-0">
              Join the professional infrastructure for planetary health. We
              simplify plastic collection for a cleaner, more efficient
              environment.
            </p>
            <div
              class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <router-link
                to="/register"
                class="bg-primary text-white px-8 py-4 rounded-xl text-sm font-medium shadow-lg shadow-primary/20 transition-all active:scale-95 text-center">
                Schedule Pickup
              </router-link>
              <a
                href="#how-it-works"
                class="border-2 border-secondary text-secondary px-8 py-4 rounded-xl text-sm font-medium transition-all active:scale-95 text-center">
                Learn More
              </a>
            </div>
          </div>
          <div class="relative">
            <div
              class="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
            <div
              class="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
            <div class="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                alt="Environmental Cleanup"
                class="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJSEHqD_QApf3zWozwQ2bhOkNXsOGoG7FupW10iJlfOIc1STCDAdnHGn8iCnkb8ezmgjaqpOL1UpZyqzaZUWerS_qOx5sousIlsGH3f3SZa_CNhHtbgjhKYtI2gY06BzA5ugkKmRM63iz_t2ycNyFj0FpFd7JfgcFbLR3Xquc5oqKDkVgKpsf0465xFGe7NhZlylz7sASatmeP4jGFc7QSmZ2l0V0SG9tzY_AEenQiWolWivk3RdNiJNf8VZpAA-JoWZfYWowU754" />
            </div>
            <!-- Stats Overlay -->
            <div
              class="absolute bottom-6 left-6 right-6 sm:left-auto sm:w-64 bg-white/70 backdrop-blur-md border border-white/30 p-6 rounded-2xl shadow-xl">
              <div class="flex items-center gap-3 mb-2">
                <span
                  class="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-lg"
                  >eco</span
                >
                <span class="text-2xl font-bold text-on-surface"
                  >12k+ Tons</span
                >
              </div>
              <p class="text-sm text-on-surface-variant">
                Plastic recovered this year across 50 cities.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- How it Works -->
      <section id="how-it-works" class="py-24 bg-surface-container-low">
        <div class="max-w-[1280px] mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl font-semibold text-on-surface mb-4">
              Streamlined Stewardship
            </h2>
            <p class="text-base text-on-surface-variant">
              A professional process designed for maximum environmental impact.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Step 1 -->
            <div
              class="bg-white p-8 rounded-[32px] border border-outline-variant hover:shadow-xl transition-shadow group">
              <div
                class="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <span class="material-symbols-outlined text-3xl"
                  >touch_app</span
                >
              </div>
              <span
                class="text-xs font-semibold text-primary uppercase tracking-widest block mb-2"
                >Step 01</span
              >
              <h3 class="text-2xl font-semibold text-on-surface mb-4">
                Request
              </h3>
              <p class="text-sm text-on-surface-variant">
                Log your pickup location through our app. Our system optimizes
                routes for efficiency.
              </p>
            </div>
            <!-- Step 2 -->
            <div
              class="bg-primary text-white p-8 rounded-[32px] shadow-2xl shadow-primary/20 flex flex-col justify-between">
              <div>
                <div
                  class="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-8">
                  <span class="material-symbols-outlined text-3xl"
                    >local_shipping</span
                  >
                </div>
                <span
                  class="text-xs font-semibold text-white/70 uppercase tracking-widest block mb-2"
                  >Step 02</span
                >
                <h3 class="text-2xl font-semibold mb-4">We Collect</h3>
                <p class="text-sm text-white/80">
                  Our agents arrive at your scheduled window for a seamless
                  handover.
                </p>
              </div>
            </div>
            <!-- Step 3 -->
            <div
              class="bg-white p-8 rounded-[32px] border border-outline-variant hover:shadow-xl transition-shadow group">
              <div
                class="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <span class="material-symbols-outlined text-3xl"
                  >precision_manufacturing</span
                >
              </div>
              <span
                class="text-xs font-semibold text-secondary uppercase tracking-widest block mb-2"
                >Step 03</span
              >
              <h3 class="text-2xl font-semibold text-on-surface mb-4">
                We Recycle
              </h3>
              <p class="text-sm text-on-surface-variant">
                Waste is processed at state-of-the-art facilities and converted
                into raw material.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Coverage Section -->
      <section class="py-24 px-4">
        <div class="max-w-[1280px] mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div
              class="relative h-[400px] rounded-3xl overflow-hidden shadow-xl order-2 lg:order-1">
              <img
                alt="Coverage Map"
                class="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS1ZGg3K9qzWZ8xa7kQAkxJzZU73mz2Rt71HFVfkrwknc-my-ApeHTgajvAlTwKS1e5V8yhHF0APSDNME_Mq9N8fa-SMoo-oGignWbM0otJ4s8eJCIhDeVPfPM1bNs6QJ0b_PgIiRKb--fB_maCqf0gcTVX_PyTZxdeIhKSc1bVIxiILwDXhy7CDetPMegxe9xs8Wmu3TWxINKA7nzAcMXN35aN9s0YCJvK-EnHGrcyy7nrCGFkexW25pNb8G21HtXm8vtpVMBihk" />
              <div
                class="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
              <div class="absolute bottom-8 left-8">
                <div
                  class="bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-primary/20">
                  <p class="text-xs font-semibold text-primary mb-1">
                    New Hub Added
                  </p>
                  <p class="text-2xl font-semibold text-on-surface">
                    San Francisco
                  </p>
                </div>
              </div>
            </div>
            <div class="order-1 lg:order-2">
              <h2 class="text-3xl font-semibold text-on-surface mb-6">
                Expanding our
                <span class="text-secondary">Vital Infrastructure</span>
              </h2>
              <p class="text-lg text-on-surface-variant mb-8">
                We are rapidly deploying collection networks across major
                metropolitan areas.
              </p>
              <div class="space-y-4">
                <div
                  class="flex items-center gap-4 p-4 rounded-2xl bg-surface-container border border-outline-variant">
                  <span
                    class="material-symbols-outlined text-primary bg-white p-2 rounded-lg"
                    >location_on</span
                  >
                  <div class="flex-1">
                    <p class="text-sm font-medium text-on-surface">
                      Active Cities
                    </p>
                    <div
                      class="w-full bg-outline-variant h-1.5 rounded-full mt-2">
                      <div class="bg-primary h-full rounded-full w-[75%]"></div>
                    </div>
                  </div>
                  <span class="text-sm font-medium text-primary">54/70</span>
                </div>
                <div
                  class="flex items-center gap-4 p-4 rounded-2xl bg-surface-container border border-outline-variant">
                  <span
                    class="material-symbols-outlined text-secondary bg-white p-2 rounded-lg"
                    >verified</span
                  >
                  <div class="flex-1">
                    <p class="text-sm font-medium text-on-surface">
                      Compliance Rate
                    </p>
                    <div
                      class="w-full bg-outline-variant h-1.5 rounded-full mt-2">
                      <div
                        class="bg-secondary h-full rounded-full w-[98%]"></div>
                    </div>
                  </div>
                  <span class="text-sm font-medium text-secondary">98.4%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-surface-container-low border-t border-outline-variant">
      <div
        class="w-full py-12 px-4 md:px-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 max-w-[1280px] mx-auto">
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-2xl"
              >recycling</span
            >
            <span class="text-2xl font-bold text-primary">PlasticPickup</span>
          </div>
          <p class="text-sm text-on-surface-variant max-w-xs">
            Building the world's most reliable infrastructure for plastic waste
            management.
          </p>
        </div>
        <div class="flex flex-col md:flex-row gap-8 md:gap-16">
          <nav class="flex flex-col gap-3">
            <h4
              class="text-sm font-bold text-on-surface uppercase tracking-widest">
              Platform
            </h4>
            <a
              class="text-sm text-on-surface-variant hover:text-secondary transition-colors"
              href="#how-it-works"
              >How it Works</a
            >
            <router-link
              class="text-sm text-on-surface-variant hover:text-secondary transition-colors"
              to="/register"
              >Get Started</router-link
            >
          </nav>
          <nav class="flex flex-col gap-3">
            <h4
              class="text-sm font-bold text-on-surface uppercase tracking-widest">
              Account
            </h4>
            <router-link
              class="text-sm text-on-surface-variant hover:text-secondary transition-colors"
              to="/login"
              >Login</router-link
            >
            <router-link
              class="text-sm text-on-surface-variant hover:text-secondary transition-colors"
              to="/register"
              >Register</router-link
            >
          </nav>
        </div>
      </div>
      <div
        class="max-w-[1280px] mx-auto px-4 py-6 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-sm text-on-surface-variant">
          © 2024 PlasticPickup. All rights reserved.
        </p>
      </div>
    </footer>

    <!-- Bottom Nav (Mobile Only) -->
    <nav
      class="fixed bottom-0 left-0 w-full flex justify-around items-center py-2 px-4 md:hidden bg-white shadow-lg rounded-t-xl z-50">
      <router-link
        to="/"
        class="flex flex-col items-center justify-center bg-primary/10 text-primary rounded-full px-4 py-1">
        <span class="material-symbols-outlined">home</span>
        <span class="text-xs font-semibold">Home</span>
      </router-link>
      <router-link
        to="/register"
        class="flex flex-col items-center justify-center text-on-surface-variant">
        <span class="material-symbols-outlined">add_circle</span>
        <span class="text-xs font-semibold">Request</span>
      </router-link>
      <router-link
        to="/login"
        class="flex flex-col items-center justify-center text-on-surface-variant">
        <span class="material-symbols-outlined">person</span>
        <span class="text-xs font-semibold">Login</span>
      </router-link>
    </nav>

    <!-- FAB -->
    <div class="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-40 group">
      <router-link
        to="/register"
        class="bg-primary text-white w-14 h-14 md:w-16 md:h-16 rounded-2xl shadow-xl flex items-center justify-center transition-all duration-300 hover:rotate-12 hover:scale-110 active:scale-95">
        <span class="material-symbols-outlined text-3xl">add</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: "LandingView" });
</script>
