<template>
  <footer class="border-t border-gray-200 bg-gray-950 text-gray-300 dark:border-gray-800">
    <div class="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
      <div class="md:col-span-2">
        <div class="mb-4 flex items-center gap-2">
          <img src="/logo 1.png" alt="QuickBuy logo" class="h-11 w-auto" />
          <span class="text-2xl font-extrabold text-white">QuickBuy</span>
        </div>
        <p class="max-w-md text-sm leading-6 text-gray-400">
          Affordable products, secure checkout, and a simple shopping experience—all in one place.
        </p>
      </div>

      <div>
        <h3 class="mb-4 font-bold text-white">Quick Links</h3>
        <div class="space-y-3 text-sm">
          <router-link to="/" class="block hover:text-white">Home</router-link>
          <a href="/#products" class="block hover:text-white">Products</a>
          <router-link to="/cart" class="block hover:text-white">Cart</router-link>
          <router-link to="/login" class="block hover:text-white">Login</router-link>
        </div>
      </div>

      <div>
        <h3 class="mb-4 font-bold text-white">Contact</h3>
        <div class="space-y-3 text-sm text-gray-400">
          <p>Colombo, Sri Lanka</p>
          <p>support@quickbuy.demo</p>
          <p>+94 77 000 0000</p>
        </div>
      </div>
    </div>

    <div class="border-t border-gray-800 px-4 py-5 text-center text-sm text-gray-500">
      © 2026 QuickBuy. All Rights Reserved.
    </div>
  </footer>
</template>
