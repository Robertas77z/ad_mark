import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = token;
    }
    return config;
});

export const createCardAPICall = (card) => {
    return axios.post(`${API_URL}/cards`, card);
};

export const updateCardAPICall = (id, card) => {
    return axios.put(`${API_URL}/cards/${id}`, card);
};

export const deleteCardAPICall = (id) => {
    return axios.delete(`${API_URL}/cards/${id}`);
};

export const getCardsAPICall = () => {
    return axios.get(`${API_URL}/cards`);
};

export const getCardsByCategoryAPICall = (categoryId) => {
    return axios.get(`${API_URL}/cards/category/${categoryId}`);
};

export const getAllCardsAPICall = () => {
    return axios.get(`${API_URL}/cards`);
};

export const getCardByIdAPICall = (id) => {
    return axios.get(`${API_URL}/cards/${id}`);
};
