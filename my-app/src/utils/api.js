
const API_BASE_URL = 'http://localhost:4167/api';


export const getToken = () => {
  return localStorage.getItem('token');
};


export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};


export const isLoggedIn = () => {
  return !!getToken();
};


export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

export const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();


    if (response.status === 401) {
      logout();
      return null;
    }

    if (!response.ok) {
      throw new Error(data.msg || 'Request failed');
    }

    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
};


export const getExpenses = () => apiRequest('/expenses');
export const addExpense = (expense) => apiRequest('/expenses', {
  method: 'POST',
  body: JSON.stringify(expense),
});
export const updateExpense = (id, expense) => apiRequest(`/expenses/${id}`, {
  method: 'PUT',
  body: JSON.stringify(expense),
});
export const deleteExpense = (id) => apiRequest(`/expenses/${id}`, {
  method: 'DELETE',
});

export const getIncome = () => apiRequest('/income');
export const addIncome = (income) => apiRequest('/income', {
  method: 'POST',
  body: JSON.stringify(income),
});
export const updateIncome = (id, income) => apiRequest(`/income/${id}`, {
  method: 'PUT',
  body: JSON.stringify(income),
});
export const deleteIncome = (id) => apiRequest(`/income/${id}`, {
  method: 'DELETE',
});

export const getAdminData = () => apiRequest('/admin/data');
