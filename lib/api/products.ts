import { envConfig } from '@/lib/config/envConfig';
import { CreateProductFormData, Product } from '@/types/products';

const API_BASE_URL = envConfig.backendBaseUrl;

export interface ApiError {
  message: string;
  status?: number;
}

export const productsApi = {
  createProduct: async (data: CreateProductFormData): Promise<Product> => {
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

  getProductById: async (id: string): Promise<Product> => {
    const url = `${API_BASE_URL}/products/${id}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  },

  getProductByName: async (productName: string): Promise<Product> => {
    const url = `${API_BASE_URL}/products?product_name=${encodeURIComponent(productName)}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  },

  updateProduct: async (
    id: string,
    data: CreateProductFormData
  ): Promise<Product> => {
    const url = `${API_BASE_URL}/products/${id}`;

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  },

  deleteProduct: async (
    id: string
  ): Promise<{ success: boolean; message: string }> => {
    const url = `${API_BASE_URL}/products/${id}`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json();
  },
};
