import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

// Axios instance with auth and interceptors
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

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

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');  // clear stored user too
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// =========================
// Auth APIs
// =========================
export const registerUser = (data: any) => api.post('/auth/register', data);
export const loginUser = (data: { email: string; password: string }) => api.post('/auth/login', data);
export const fetchUserById = (id: number) => api.get(`/auth/${id}`);

export const getCurrentUser = () => {
    const token = localStorage.getItem("token");
    return axios.get("/api/auth/current-user", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}; // Assuming you add this route

// =========================
// Books APIs
// =========================
export const getBooks = (params: { page?: number; limit?: number; search?: string }) =>
    api.get('/books', { params });

export const getBookById = (id: number) => api.get(`/books/${id}`);

export const addBook = (data: any) => api.post('/books', data);

export const getBooksByOwner = async (owner_id: number) => {
    return await api.get(`/books/owned/${owner_id}`);
};


// =========================
// Shelf APIs
// =========================
export const getShelf = (userId: number) => api.get(`/shelf/${userId}`);

// =========================
// Saved APIs
// =========================
export const getSavedList = (userId: number) => api.get(`/saved/${userId}`);
export const saveBook = (data: { user_id: number; book_id: number }) =>
    api.post('/saved/add', data);
export const removeBookFromSaved = (data: { user_id: number; book_id: number }) =>
    api.delete('/saved/remove', { data });

// =========================
// Borrow APIs
// =========================
export const borrowBook = (data: { user_id: number; book_id: number }) =>
    api.post('/borrow', data);

// =========================
// Admin APIs (Protected)
// =========================
export const adminAddBook = (data: any) => api.post('/admin/books', data);

export const adminUpdateBook = (id: number, data: any) =>
    api.put(`/admin/books/${id}`, data);

export const adminDeleteBook = (id: number) =>
    api.delete(`/admin/books/${id}`);

export const getBookRequests = () => api.get('/admin/book-requests');

export const approveBookRequest = (id: number) =>
    api.put(`/admin/book-requests/${id}/approve`);

export const denyBookRequest = (id: number) =>
    api.put(`/admin/book-requests/${id}/deny`);