// API integration layer for Nomad Treasures backend
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-domain.com/server/php-backend"
    : "http://localhost/nomad-treasures/server/php-backend";

interface ApiResponse<T> {
  success?: boolean;
  message?: string;
  error?: string;
  data?: T;
  [key: string]: any;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem("auth_token");
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "API request failed");
      }

      return data;
    } catch (error) {
      console.error("API Request Error:", error);
      throw error;
    }
  }

  // Authentication
  async register(userData: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    password: string;
    role?: "customer" | "supplier";
    supplier_info?: {
      business_name: string;
      tribe: string;
      location: string;
      description: string;
    };
  }) {
    const response = await this.request("/api/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });

    if (response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  async login(email: string, password: string) {
    const response = await this.request("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (response.token) {
      this.setToken(response.token);
    }

    return response;
  }

  async logout() {
    await this.request("/api/logout", { method: "POST" });
    this.clearToken();
  }

  // Products
  async getProducts(
    filters: {
      tribe?: string;
      category?: string;
      min_price?: number;
      max_price?: number;
      search?: string;
      sort?: string;
      limit?: number;
      offset?: number;
    } = {},
  ) {
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        queryParams.append(key, value.toString());
      }
    });

    const queryString = queryParams.toString();
    const endpoint = `/api/products${queryString ? `?${queryString}` : ""}`;

    return this.request(endpoint);
  }

  async getProduct(id: number) {
    return this.request(`/api/product/${id}`);
  }

  // Orders
  async createOrder(orderData: {
    user_id: number;
    items: Array<{
      product_id: number;
      quantity: number;
    }>;
    shipping_address: {
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      address: string;
      city: string;
      state?: string;
      zipCode?: string;
      country: string;
    };
    payment_method: string;
    currency?: string;
  }) {
    return this.request("/api/order", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  }

  async getOrders(limit = 10, offset = 0) {
    return this.request(`/api/orders?limit=${limit}&offset=${offset}`);
  }

  // Payments
  async processPayment(paymentData: {
    order_id: number;
    payment_method: "bank_transfer" | "mpesa" | "paypal";
    amount: number;
    currency: string;
    phone_number?: string; // for M-Pesa when activated
  }) {
    if (paymentData.payment_method === "bank_transfer") {
      // For bank transfer, we'll return the bank details
      return {
        success: true,
        message: "Please complete payment using the bank details provided",
        bank_details: {
          bank_name: "Equity Bank",
          paybill: "247247",
          account_number: "0748261019",
          account_name: "Nomad Treasures",
          amount: paymentData.amount,
          currency: paymentData.currency,
          reference: `ORDER-${paymentData.order_id}`,
        },
      };
    }

    const endpoint =
      paymentData.payment_method === "mpesa"
        ? "/api/payments/mpesa"
        : "/api/payments/paypal";

    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(paymentData),
    });
  }

  // Admin
  async getAdminDashboard() {
    return this.request("/api/admin/dashboard");
  }

  async manageProducts(action: string, productData: any) {
    return this.request("/api/admin/products", {
      method: "POST",
      body: JSON.stringify({ action, ...productData }),
    });
  }

  // Supplier
  async getSupplierDashboard() {
    return this.request("/api/supplier/dashboard");
  }

  async addSupplierProduct(productData: any) {
    return this.request("/api/supplier/products", {
      method: "POST",
      body: JSON.stringify(productData),
    });
  }

  // Contact
  async sendContactMessage(messageData: {
    name: string;
    email: string;
    subject?: string;
    message: string;
  }) {
    return this.request("/api/contact", {
      method: "POST",
      body: JSON.stringify(messageData),
    });
  }

  // Token management
  setToken(token: string) {
    this.token = token;
    localStorage.setItem("auth_token", token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem("auth_token");
  }

  getToken() {
    return this.token;
  }

  isAuthenticated() {
    return !!this.token;
  }
}

// Create singleton instance
export const apiClient = new ApiClient(API_BASE_URL);

// Export types for use in components
export type { ApiResponse };

// Utility hooks for React components
export const useApi = () => {
  return {
    api: apiClient,
    isAuthenticated: apiClient.isAuthenticated(),
    token: apiClient.getToken(),
  };
};
