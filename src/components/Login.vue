<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth"; // Make sure this path is correct

const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

// Simple email regex for validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Hardcoded valid credentials
const validEmail = "kminchelle@example.com";
const validPassword = "0lelplR";

function login() {
  error.value = "";
  loading.value = true;

  // Validate email
  if (!email.value || !emailRegex.test(email.value)) {
    error.value = "Please enter a valid email.";
    loading.value = false;
    return;
  }

  // Validate password
  if (!password.value) {
    error.value = "Please enter a password.";
    loading.value = false;
    return;
  }

  // Check credentials
  if (email.value !== validEmail || password.value !== validPassword) {
    error.value = "Login failed. Wrong email or password.";
    loading.value = false;
    return;
  }

  // If credentials are correct, create fake user
  const fakeUser = {
    firstName: "Kmin",
    lastName: "Chelle",
    username: email.value,
  };
  const fakeToken = "1234567890abcdef";

  authStore.login(fakeToken, fakeUser);

  // Redirect to home page
  router.push("/");
  loading.value = false;
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen px-4">
    <div class="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
      <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>

      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="border p-2 w-full mb-3 rounded bg-white dark:bg-gray-800 dark:text-white"
      />

      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="border p-2 w-full mb-3 rounded bg-white dark:bg-gray-800 dark:text-white"
      />

      <button
        @click="login"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
      >
        {{ loading ? "Logging in..." : "Login" }}
      </button>

      <p v-if="error" class="text-red-500 mt-3 text-center">
        {{ error }}
      </p>

      <p class="text-sm text-gray-500 mt-4 text-center">
        Use: <b>kminchelle@example.com / 0lelplR</b>
      </p>
    </div>
  </div>
</template>