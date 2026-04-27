import { createRouter, createWebHistory } from "vue-router"

import ProductList from "../views/ProductList.vue"
import ProductDetail from "../views/productDetail.vue"
import Cart from '../views/Cart.vue'
import Login from "../components/Login.vue"

const routes = [

{
path: "/",
component: ProductList
},

{
path: "/product/:id",
component: ProductDetail
},

{ path: '/cart', component: Cart },


{
  path: "/login",
  component: Login
}

]

export default createRouter({

history: createWebHistory(),
routes

})