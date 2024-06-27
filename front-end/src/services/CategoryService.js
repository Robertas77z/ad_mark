import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Pakeiskite į jūsų API URL

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = token;
    }
    return config;
});

export const createCategoryAPICall = (category) => {
    return axios.post(`${API_URL}/categories`, category);
};

export const updateCategoryAPICall = (id, category) => {
    return axios.put(`${API_URL}/categories/${id}`, category);
};

export const deleteCategoryAPICall = (id) => {
    return axios.delete(`${API_URL}/categories/${id}`);
};

export const getCategoriesAPICall = () => {
    return axios.get(`${API_URL}/categories`);

    
};

