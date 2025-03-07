import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/admin';

const adminApi = {
    addBook: async (bookData: {
        title: string;
        author: string;
        genre: string;
        description?: string;
        status?: string;
    }, token: string) => {
        const response = await axios.post(`${BASE_URL}/books`, bookData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    updateBook: async (bookId: number, bookData: {
        title?: string;
        author?: string;
        genre?: string;
        description?: string;
        status?: string;
    }, token: string) => {
        const response = await axios.put(`${BASE_URL}/books/${bookId}`, bookData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    deleteBook: async (bookId: number, token: string) => {
        const response = await axios.delete(`${BASE_URL}/books/${bookId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    getBookRequests: async (token: string) => {
        const response = await axios.get(`${BASE_URL}/book-requests`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    approveBookRequest: async (bookId: number, token: string) => {
        const response = await axios.put(`${BASE_URL}/book-requests/${bookId}/approve`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    },

    denyBookRequest: async (bookId: number, token: string) => {
        const response = await axios.put(`${BASE_URL}/book-requests/${bookId}/deny`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    }
};

export default adminApi;