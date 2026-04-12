<script setup lang="ts"> 
import { inject, computed, type Ref } from "vue" 
import type { Product } from "../types/product" 
import { convertToLKR } from "../utils/currency" 

const isDarkRef = inject<Ref<boolean>>("isDark")!
const cardClasses = computed(() => [
  'border rounded p-4 shadow hover:shadow-xl hover:scale-[1.02] cursor-pointer transition',
  isDarkRef.value ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black'
])
const { product } = defineProps<{ product: Product }>()
const emit = defineEmits<{ (e: "open", product: Product): void }>() 
const getSoldCount = computed(() => { 
   const seed = product.id * 12345 
    return Math.floor(seed % (product.stock + 1)) }) 
    </script> 
    
    <template> 
    <div 
    @click="emit('open', product)" 
    :class="cardClasses" >
     <img :src="product.thumbnail" class="w-full h-40 object-cover rounded" alt="product image" />
      <h2 class="font-bold mt-2"> {{ product.title }} </h2> 
      
      <div class="flex items-center mt-2 text-sm">
       <p class="text-blue-500 font-semibold"> {{ convertToLKR(product.price) }} 

       </p> 
       <p class="text-gray-500 ml-auto"> {{ getSoldCount }} +sold </p> 
       </div>
       
   </div>
   </template>