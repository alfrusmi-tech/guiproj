import type { Product } from "../types/product"

const BASE_URL = "https://dummyjson.com/products"

interface ProductsResponse {
  products: Product[]
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(BASE_URL)
  const data: ProductsResponse = await res.json()
  return data.products
}

export async function getProduct(id: number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/${id}`)
  const data: Product = await res.json()
  return data
}

export async function getCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/categories`)
  const data: string[] = await res.json()
  return data
}