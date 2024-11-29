import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/version1',
    timeout: 20000,
    headers: { 'Content-Type': 'application/json'},
});

export const createUsers = async (userData) => {
    try {
        const response = await api.post('/users/',userData);
        console.log('Create User Response:',response.data);
        return response.data;
    }
    catch(error) {
        console.error('Error creating user:', error);
    }
};

export const logInUser = async (userData) => {
    try {
        console.log('Loggin in:', userData);
        const response = await api.post('/users/login/',userData);
        console.log('Login Response: ',response.data);

        if(response.data && response.data.token){
            const token = response.data.token;
            console.log('Token received:',token);

            //Store token in local storage.
            await AsyncStorage.setItem('authToken', token)

            // token saved in axios header for future authenticated requests.
            api.defaults.headers.common['Authorization'] = `Token ${token}`;
            return response.data; // Returning the full response.
        } else {
            console.log('No token received, check response structured');
            return null; // Make sure to handle no token case.
        }
    }
    catch(error) {
        if(error.response){
            console.error('Login error response',error.response.data);
        }
        else{
            console.error('Error logging in:', error);
        }
        throw error;
    }
};

export const logOutUser = async () => {
    try {
        // Make a request to the backend.
        await api.post('/users/logout/');
        // Remove token from localStorage.
        await AsyncStorage.removeItem('authToken');
        delete api.defaults.headers.common['Authorization'];
        console.log("User logged out successfully");
    } catch (error) {
        console.log("Error logging out:", error);
    }
    
};

export const editUsers = async (userId,userData) => {
    try {
        const response = await api.put(`/users/${userId}/`,userData);
        return response.data;
    }
    catch(error) {
        console.error('Error editing user:', error);
    }
};

export const deleteUsers = async (userId) => {
    try {
        const response = await api.delete(`/users/delete/${userId}/`);
        return response.data;
    }
    catch(error) {
        console.error('Error deleting user:', error);
    }
};

export const createEvents = async (eventData) => {
    try {
        const token = await AsyncStorage.getItem('authToken');
        if(!token){
            console.error('No Token found');
            return;
        }
        const startDateUTC = new Date(eventData.startDate).toISOString();
        const endDateUTC = new Date(eventData.endDate).toISOString();

        const formatDateData = {
            ...eventData,
            startDate: startDateUTC,
            endDate: endDateUTC,
        };
        const response = await api.post('/event/',formatDateData, {
            headers: {
                Authorization: `Token ${token}`,
            },
        });
        return response.data;
    }
    catch(error) {
        if(error.response){
            console.error('Error response create event:', error.response.data);
            console.error('Error status:', error.response.status);
        } else if (error.request){
            console.log('No Response:',error.request);
        } else {
            console.error('Error message: ', error.message);
        }
        console.error('Complete error object:',error)
    }
};

export const editEvents = async (eventId,eventData) => {
    try {
        const token = await AsyncStorage.getItem('authToken');

        if(!token){
            console.error('Token not found for editEvents.');
            return;
        }

        const response = await api.put(`/event/edit/${eventId}/`, eventData, {
            headers: {
                Authorization: `Token ${token}`, 
            },
        });
        console.log('Event ID:', eventId);
        console.log('Event Data:', eventData);
        return response.data;
    }
    catch(error) {
        console.error('Error editing event:', error);
        if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error status:', error.response.status);
        }
        throw error;
    }
};

export const getEvents = async (eventId) => {
    try {
        const token = await AsyncStorage.getItem('authToken');
        if(!token){
            console.error('Token not found for getEvents.');
            return;
        }

        let url = '/events/';
        if (eventId) {
            url = `/event/${eventId}/`;  // get specific event by ID
        }

        const response = await api.get(url, {
            headers : {
                Authorization: `Token ${token}`,
            },
        });

        if (response.data && Array.isArray(response.data)) {
            response.data.forEach(event => {
                if (!event.id) {
                    console.error('Event missing ID:', event);
                }
            });
        }
        return response.data;
    }
    catch(error) {
        if(error.response){
            console.error('Error creating event:', error.response.data);
            console.error('Error status:', error.response.status);
        } else {
            console.log('Error:',error)
        }
    }
};

export const deleteEvents = async (eventId) => {
    try {
        const token = await AsyncStorage.getItem('authToken');

        const config = {
            headers: {
                Authorization: `Token ${token}`,  // Attach token to the request header
            }
        };
        const response = await axios.delete(`http://localhost:8000/api/version1/event/delete/${eventId}/`, config);
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
        const response = await api.put(`/task/edit/${taskId}/`,taskData);
        return response.data;
    }
    catch(error) {
        console.error('Error editing task:', error);
    }
};

export const getTask = async (taskId) => {
    try {
        const response = await api.get(`/task/${taskId}/`);
        return response.data;
    }
    catch(error) {
        console.error('Error getting task:', error);
    }
};

export const deleteTask = async (taskId) => {
    try {
        const response = await api.delete(`/task/delete/${taskId}/`);
        return response.data;
    }
    catch(error) {
        console.error('Error deleting task:', error);
    }
};

export const createReminder = async (reminderData) => {
    try {
        const response = await api.post('/reminder/',reminderData);
        return response.data;
    }
    catch(error) {
        console.error('Error creating reminder:', error);
    }
};

export const editReminder = async (reminderId,reminderData) => {
    try {
        const response = await api.put(`/reminder/edit/${reminderId}/`,reminderData);
        return response.data;
    }
    catch(error) {
        console.error('Error editing reminder:', error);
    }
};

