import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000:5432/api',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json'},
});

export const createUsers = async (userData) => {
    try {
        const response = await api.post('/users/',userData);
        return response.data;
    }
    catch(error) {
        console.error('Error creating user:', error);
    }
};

export const editUsers = async (userId,userData) => {
    try {
        const response = await api.put('/users/${userID}/',userData);
        return response.data;
    }
    catch(error) {
        console.error('Error editing user:', error);
    }
};

export const deleteUsers = async (userId) => {
    try {
        const response = await api.delete('/users/delete/${userID}/');
        return response.data;
    }
    catch(error) {
        console.error('Error deleting user:', error);
    }
};

export const createEvents = async (eventData) => {
    try {
        const response = await api.post('/event/',eventData);
        return response.data;
    }
    catch(error) {
        console.error('Error creating event:', error);
    }
};

export const editEvents = async (eventId,eventData) => {
    try {
        const response = await api.put('/event/edit/${eventId}/',eventData);
        return response.data;
    }
    catch(error) {
        console.error('Error editing event:', error);
    }
};

export const getEvents = async (eventId) => {
    try {
        const response = await api.get('/event/${eventId}/');
        return response.data;
    }
    catch(error) {
        console.error('Error getting event:', error);
    }
};

export const deleteEvents = async (eventId) => {
    try {
        const response = await api.delete('/event/delete/${eventId}/');
        return response.data;
    }
    catch(error) {
        console.error('Error deleting event:', error);
    }
};

export const createTasks = async (taskData) => {
    try {
        const response = await api.post('/task/',taskData);
        return response.data;
    }
    catch(error) {
        console.error('Error creating task:', error);
    }
};

export const editTasks = async (taskId,taskData) => {
    try {
        const response = await api.put('/task/edit/${taskId}/',taskData);
        return response.data;
    }
    catch(error) {
        console.error('Error editing task:', error);
    }
};

export const getTask = async (taskId) => {
    try {
        const response = await api.get('/task/${taskId}/');
        return response.data;
    }
    catch(error) {
        console.error('Error getting task:', error);
    }
};

export const deleteTask = async (taskId) => {
    try {
        const response = await api.delete('/task/delete/${taskId}/');
        return response.data;
    }
    catch(error) {
        console.error('Error deleting task:', error);
    }
};

export const createReminder = async (reminderData) => {
    try {
        const response = await api.get('/reminder/',reminderData);
        return response.data;
    }
    catch(error) {
        console.error('Error creating task:', error);
    }
};

export const editReminder = async (reminderId,reminderData) => {
    try {
        const response = await api.get('/reminder/edit/${reminderId}/',reminderData);
        return response.data;
    }
    catch(error) {
        console.error('Error editing task:', error);
    }
};

