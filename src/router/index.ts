

import { createRouter, createWebHistory } from "vue-router"
import ProductList from "../views/ProductList.vue"
import ProductDetail from "../views/productDetail.vue"
import Cart from "../views/Cart.vue"
import Login from "../components/Login.vue"

const routes = [
  { path: "/", component: ProductList },
  { path: "/products", redirect: "/" },
  { path: "/product/:id", component: ProductDetail },
  { path: "/cart", component: Cart },
  { path: "/login", component: Login },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router