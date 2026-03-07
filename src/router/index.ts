import { createRouter, createWebHistory } from "vue-router"

import ProductList from "../views/Productlist.vue"
import ProductDetail from "../views/productDetail.vue"
import Dashboard from "../views/Dashboard.vue"

const routes = [

{
path: "/",
component: ProductList
},

{
path: "/product/:id",
component: ProductDetail
},

{
path: "/dashboard",
component: Dashboard
}

]

export default createRouter({

history: createWebHistory(),
routes

})