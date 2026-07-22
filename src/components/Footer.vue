<script setup lang="ts">
import { inject, type Ref } from "vue"
const isDark = inject<Ref<boolean>>("isDark")!
</script>

<template>
  <footer :class="isDark ? 'bg-gray-900 border-t border-gray-700 text-gray-300' : 'bg-white border-t border-gray-200 text-gray-800'" class="pt-10 pb-6">
    <div class="text-center mb-8">
      <div class="flex items-center justify-center gap-2 mb-3">
        <img src="/logo 1.png" alt="QuickBuy Logo" class="h-10 w-auto" />
        <span :class="isDark ? 'text-white' : 'text-gray-900'" class="text-2xl font-bold">QuickBuy</span>
      </div>
      <p :class="isDark ? 'text-gray-300' : 'text-gray-600'" class="text-sm max-w-lg mx-auto">
        Your premium destination for the latest gadgets, beauty, and lifestyle products. Quality guaranteed.
      </p>
    </div>

    <div class="flex justify-center gap-16 mb-8 text-sm">
      <router-link to="/about" :class="isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'" class="transition">About Us</router-link>
      <router-link to="/team" :class="isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'" class="transition">Team</router-link>
      <router-link to="/faq" :class="isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'" class="transition">FAQ</router-link>
      <router-link to="/contact" :class="isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-black'" class="transition">Contact Us</router-link>
    </div>

    <div class="flex justify-center gap-4 mb-8">
      <a href="#" :class="isDark ? 'border-gray-400 hover:bg-gray-800' : 'border-gray-800 hover:bg-gray-100'" class="w-9 h-9 border rounded flex items-center justify-center transition">
        <img src="/icons8-facebook-50.png" alt="Facebook" class="w-5 h-5" />
      </a>
      <a href="#" :class="isDark ? 'border-gray-400 hover:bg-gray-800' : 'border-gray-800 hover:bg-gray-100'" class="w-9 h-9 border rounded flex items-center justify-center transition">
        <img src="/instagram.png" alt="Instagram" class="w-5 h-5" />
      </a>
      <a href="#" :class="isDark ? 'border-gray-400 hover:bg-gray-800' : 'border-gray-800 hover:bg-gray-100'" class="w-9 h-9 border rounded flex items-center justify-center transition">
        <img src="/social.png" alt="LinkedIn" class="w-5 h-5" />
      </a>
      <a href="#" :class="isDark ? 'border-gray-400 hover:bg-gray-800' : 'border-gray-800 hover:bg-gray-100'" class="w-9 h-9 border rounded flex items-center justify-center transition">
        <img src="/twitter.png" alt="Twitter" class="w-5 h-5" />
      </a>
    </div>

    <div :class="isDark ? 'border-gray-700' : 'border-gray-200'" class="pt-4 text-center">
      <p :class="isDark ? 'text-gray-400' : 'text-gray-500'" class="text-sm">© 2026 QuickBuy. All Rights Reserved.</p>
    </div>
  </footer>
</template>