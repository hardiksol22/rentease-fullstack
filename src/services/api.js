import axios from 'axios';

// ⚡ BULLETPROOF FIX: Environment variable ka jhanjhat khatam, direct live URL mapped!
const API_BASE_URL = 'https://rentease-backend-4uec.onrender.com/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * 🔒 Global Outbound Request Interceptor
 */
apiClient.interceptors.request.use(
  (config) => {
    const savedUser = localStorage.getItem('rentease_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser && parsedUser.token) {
          config.headers.Authorization = `Bearer ${parsedUser.token}`;
        }
      } catch (error) {
        console.error("❌ Failed parsing credentials token packet from session storage:", error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const api = {
  // 1️⃣ Authentication Resource Routes
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },
  
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  // 2️⃣ Marketplace Catalog Inventory Routes
  getProducts: async (category = '', search = '') => {
    let url = '/products?';
    if (category) url += `category=${category}&`;
    if (search) url += `search=${encodeURIComponent(search)}`;
    
    const response = await apiClient.get(url);
    return response.data;
  },

  getProductById: async (id) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  // 3️⃣ Rental System Pipeline Mappings
  bookRental: async (checkoutPayload) => {
    const response = await apiClient.post('/rentals', checkoutPayload);
    return response.data;
  },

  getMyRentals: async () => {
    const response = await apiClient.get('/rentals/my-rentals');
    return response.data;
  },

  // 4️⃣ Maintenance Support Ticket Pipelines
  createSupportTicket: async (ticketPayload) => {
    const response = await apiClient.post('/maintenance', ticketPayload);
    return response.data;
  },

  getMyTickets: async () => {
    const response = await apiClient.get('/maintenance/my-tickets');
    return response.data;
  },

  // 🤖 5️⃣ AI Chatbot Support Engine Pipeline Gateway
  sendChatMessage: async (message) => {
    const response = await apiClient.post('/chat', { message });
    return response.data;
  }
};