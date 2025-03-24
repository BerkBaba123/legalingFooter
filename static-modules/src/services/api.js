import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Plans API
export const getPlans = () => api.get('/plans');
export const getPlanDetails = (planId) => api.get(`/plans/${planId}`);

// User Plans API
export const getUserPlan = () => api.get('/user/plan');
export const updateUserPlan = (planId) => api.put('/user/plan', { planId });
export const upgradePlan = async (planId, data) => {
  try {
    // Simüle edilmiş plan yükseltme
    const mockPlans = {
      'misafir': { id: 'misafir', name: 'Misafir', type: 'Misafir', searchQuota: 10, userCount: 1, price: 0 },
      'temel': { id: 'temel', name: 'Temel', type: 'Temel', searchQuota: 50, userCount: 1, price: 99 },
      'bireysel': { id: 'bireysel', name: 'Bireysel', type: 'Bireysel', searchQuota: 100, userCount: 1, price: 199 },
      'profesyonel': { id: 'profesyonel', name: 'Profesyonel', type: 'Profesyonel', searchQuota: 1000, userCount: 5, price: 499 },
      'akademik': { id: 'akademik', name: 'Akademik', type: 'Akademik', searchQuota: 5000, userCount: 20, price: 999 }
    };

    // Plan ID'sini normalize et
    const normalizedPlanId = planId.toLowerCase().trim();
    
    // Plan ID'yi farklı formatlarda da kontrol et
    let selectedPlan = mockPlans[normalizedPlanId];
    
    if (!selectedPlan) {
      // Plan adı veya tipine göre ara
      selectedPlan = Object.values(mockPlans).find(plan => 
        plan.name.toLowerCase() === normalizedPlanId ||
        plan.type.toLowerCase() === normalizedPlanId
      );
    }

    if (!selectedPlan) {
      throw new Error('Geçersiz plan');
    }

    // Kullanıcı bilgilerini güncelle
    const user = JSON.parse(localStorage.getItem('user'));
    user.plan = selectedPlan;
    localStorage.setItem('user', JSON.stringify(user));

    return {
      success: true,
      plan: selectedPlan
    };
  } catch (error) {
    throw error;
  }
};
export const cancelPlan = async () => {
  return api.post('/user/plans/cancel');
};
export const getPlanHistory = async () => {
  return api.get('/user/plans/history');
};

// User Management
export const getCurrentUser = () => api.get('/user/me');
export const updateUserProfile = (data) => api.put('/user/profile', data);

// Auth API
export const login = async (email, password) => {
  try {
    // Simüle edilmiş başarılı giriş
    if (email === 'aygan.de.berk@gmail.com' && password === 'berkberk') {
      return {
        data: {
          user: {
            id: 1,
            email: 'aygan.de.berk@gmail.com',
            name: 'Berk',
            plan: {
              id: 'temel',
              name: 'Temel',
              type: 'Temel',
              searchQuota: 50,
              userCount: 1,
              price: 99
            }
          },
          token: 'simulated-jwt-token'
        }
      };
    }
    throw new Error('Geçersiz e-posta veya şifre');
  } catch (error) {
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    // Simüle edilmiş çıkış işlemi
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('selectedPlan');
    return { success: true };
  } catch (error) {
    throw new Error('Çıkış yapılırken bir hata oluştu');
  }
};

export const refreshToken = () => api.post('/auth/refresh');

// Payment API
export const createPaymentIntent = async (planId) => {
  try {
    const response = await api.post(`/payments/create-intent`, { planId });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const confirmPayment = (paymentId) => api.post('/payment/confirm', { paymentId });

// Search API
export const search = (query, options) => api.post('/search', { query, ...options });
export const getSearchHistory = () => api.get('/search/history');
export const getSearchQuota = () => api.get('/search/quota');

// Concepts API
export const getConcepts = (params) => api.get('/concepts', { params });
export const getConceptDetails = (conceptId) => api.get(`/concepts/${conceptId}`);
export const suggestConcept = (data) => api.post('/concepts/suggest', data);

// Error interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired, try to refresh
      try {
        await refreshToken();
        // Retry the original request
        return api(error.config);
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api; 