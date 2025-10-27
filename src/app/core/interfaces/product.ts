export interface Product {
  name: string,
  description: string,
  price: number,
  stock: number,
  category: string,
  isAvailable: boolean,
  createdAt: string
}

export interface ProductData extends Product {
  id: number
}

export interface CreateProduct {
  name: string,
  description: string,
  price: number,
  stock: number,
  category: string,

}

export interface UpdateProduct extends CreateProduct {
  isAvailable: boolean
}
