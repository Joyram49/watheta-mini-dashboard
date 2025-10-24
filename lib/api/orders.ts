import { envConfig } from '@/lib/config/envConfig';
import {
  CreateOrderFormData,
  Order,
  UpdateOrderFormData,
} from '@/types/orders';

const API_BASE_URL = envConfig.backendBaseUrl;

export interface ApiError {
  message: string;
  status?: number;
}

export const ordersApi = {
  createOrder: async (data: CreateOrderFormData): Promise<Order> => {
    const url = `${API_BASE_URL}/orders`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        created_at: Math.floor(Date.now() / 1000),
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

  getOrders: async (): Promise<Order[]> => {
    const url = `${API_BASE_URL}/orders`;

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

  getOrderById: async (id: string): Promise<Order> => {
    const url = `${API_BASE_URL}/orders/${id}`;

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

  updateOrder: async (
    id: string,
    data: UpdateOrderFormData
  ): Promise<Order> => {
    const url = `${API_BASE_URL}/orders/${id}`;

    const response = await fetch(url, {
      method: 'patch',
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

  deleteOrder: async (
    id: string
  ): Promise<{ success: boolean; message: string }> => {
    const url = `${API_BASE_URL}/orders/${id}`;

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
