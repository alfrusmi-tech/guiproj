import type { Product } from "../types/product"

const BASE_URL = "https://dummyjson.com/products"

export async function getProducts(): Promise<Product[]> {

  const res = await fetch(BASE_URL)
  const data = await res.json()

  return data.products

}

export async function getProduct(id: number): Promise<Product> {

  const res = await fetch(`${BASE_URL}/${id}`)
  return await res.json()

}