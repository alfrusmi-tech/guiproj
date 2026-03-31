<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"

const username = ref("")
const password = ref("")
const loading = ref(false)
const error = ref("")

const router = useRouter()

async function login() {
  loading.value = true
  error.value = ""

  try {
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })

    if (!res.ok) {
      throw new Error("Invalid credentials")
    }

    const data = await res.json()

    localStorage.setItem("token", data.token)
    localStorage.setItem("user", JSON.stringify(data))

    router.push("/") // go to home after login
  } catch (err) {
    error.value = "Login failed. Try again."
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen px-4">
    <div class="w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
      <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>

      <input
        v-model="username"
        placeholder="Username"
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
        Use: <b>kminchelle / 0lelplR</b>
      </p>
    </div>
  </div>
</template>