import { createRouter, createWebHistory } from "vue-router"

import ProductList from "../views/Productlist.vue"
import ProductDetail from "../views/productDetail.vue"

const routes = [

{
path: "/",
component: ProductList
},

{
path: "/product/:id",
component: ProductDetail
}

]

export default createRouter({

history: createWebHistory(),
routes

})