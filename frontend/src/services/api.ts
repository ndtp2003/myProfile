import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout();
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials).then(res => res.data),
  
  register: (userData: { email: string; password: string }) =>
    api.post('/auth/register', userData).then(res => res.data),
  
  getMe: () =>
    api.get('/auth/me').then(res => res.data),
  
  verifyToken: () =>
    api.post('/auth/verify').then(res => res.data),
};

// CV API
export const cvApi = {
  getCV: () =>
    api.get('/cv').then(res => res.data),
  
  getAdminCV: () =>
    api.get('/cv/admin').then(res => res.data),
  
  updateCV: (data: any) =>
    api.put('/cv', data).then(res => res.data),
  
  updateSettings: (settings: any) =>
    api.put('/cv/settings', settings).then(res => res.data),
  
  // Experience
  addExperience: (experience: any) =>
    api.post('/cv/experience', experience).then(res => res.data),
  
  updateExperience: (id: string, experience: any) =>
    api.put(`/cv/experience/${id}`, experience).then(res => res.data),
  
  deleteExperience: (id: string) =>
    api.delete(`/cv/experience/${id}`).then(res => res.data),
  
  // Projects
  addProject: (project: any) =>
    api.post('/cv/projects', project).then(res => res.data),
  
  updateProject: (id: string, project: any) =>
    api.put(`/cv/projects/${id}`, project).then(res => res.data),
  
  deleteProject: (id: string) =>
    api.delete(`/cv/projects/${id}`).then(res => res.data),
  
  // Education
  addEducation: (education: any) =>
    api.post('/cv/education', education).then(res => res.data),
  
  updateEducation: (id: string, education: any) =>
    api.put(`/cv/education/${id}`, education).then(res => res.data),
  
  deleteEducation: (id: string) =>
    api.delete(`/cv/education/${id}`).then(res => res.data),
  
  // Skills
  updateSkills: (skills: any) =>
    api.put('/cv/skills', skills).then(res => res.data),
  
  // Certifications
  addCertification: (certification: any) =>
    api.post('/cv/certifications', certification).then(res => res.data),
  
  updateCertification: (id: string, certification: any) =>
    api.put(`/cv/certifications/${id}`, certification).then(res => res.data),
  
  deleteCertification: (id: string) =>
    api.delete(`/cv/certifications/${id}`).then(res => res.data),
};

// Upload API
export const uploadApi = {
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(res => res.data);
  },
  
  deleteImage: (path: string) =>
    api.delete('/upload/image', { data: { path } }).then(res => res.data),
  
  getImages: () =>
    api.get('/upload/images').then(res => res.data),
};

export default api;
