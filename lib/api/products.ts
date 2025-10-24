import { envConfig } from '@/lib/config/envConfig';
import { CreateProductFormData, Product } from '@/types/products';

const API_BASE_URL = envConfig.backendBaseUrl;

export interface CreateProductResponse {
  id: string;
  createdAt: number;
  product_name: string;
  product_sku: string;
  product_category: string;
  price: number;
  stock: number;
  description?: string;
  image?: string;
  status: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

export const productsApi = {
  createProduct: async (
    data: CreateProductFormData
  ): Promise<CreateProductResponse> => {
    const url = `${API_BASE_URL}/products`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        createdAt: Math.floor(Date.now() / 1000),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  },

  getProducts: async (): Promise<Product[]> => {
    const url = `${API_BASE_URL}/products`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },
};
