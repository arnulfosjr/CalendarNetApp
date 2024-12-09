import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/version1',
    timeout: 20000,
    headers: { 'Content-Type': 'application/json'},
});

export const formatToUTC = (date) => {
    if (!date) return null; 
    return new Date(date).toISOString(); // Convert to UTC format
};

const handleApiError = (error) => {
    if (error.response) {
        console.error('API Error:', error.response.data);
        console.error('Status Code:', error.response.status);
    } else if (error.request) {
        console.error('No Response Received:', error.request);
    } else {
        console.error('Error Message:', error.message);
    }
    throw error;
};

const getAuthHeaders = async () => {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) throw new Error('No auth token found');
    return { Authorization: `Token ${token}` };
};

export const createUsers = async (userData) => {
    try {
        const response = await api.post('/users/',userData);
        console.log('Create User Response:',response.data);
        return response.data;
    }
    catch(error) {
        handleApiError(error);
    }
};

export const logInUser = async (userData) => {
    try {
        const response = await api.post('/users/login/',userData);

        if(response.data && response.data.token){
            const token = response.data.token;

            //Store token in local storage.
            await AsyncStorage.setItem('authToken', token)

            // token saved in axios header for future authenticated requests.
            console.log('Fetching user-specific data...');
            api.defaults.headers.common['Authorization'] = `Token ${token}`;
            console.log('User events: ',userData)
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
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
            console.warn("No token found, user might already be logged out.");
            return;
        }

        const headers = { Authorization: `Token ${token}` };
        await api.post('/users/logout/', {}, { headers });

        // Clear token after successful logout
        await AsyncStorage.multiRemove(['authToken','userData','taskData'])
        delete api.defaults.headers.common['Authorization'];
        console.log('User successfully logged out.');
    } catch (error) {
        console.error("Error logging out:", error);
    }
    
};

export const editUsers = async (userId,userData) => {
    try {
        const response = await api.put(`/users/${userId}/`,userData);
        return response.data;
    }
    catch(error) {
        handleApiError(error);
    }
};

export const deleteUsers = async (userId) => {
    try {
        const response = await api.delete(`/users/delete/${userId}/`);
        return response.data;
    }
    catch(error) {
        handleApiError(error);
    }
};

export const createEvents = async (eventData) => {
    try {
        const headers = await getAuthHeaders();
        const formatDateData = {
            ...eventData,
            startDate: formatToUTC(eventData.startDate),
            endDate: formatToUTC(eventData.endDate),
            endOfRepeat: formatToUTC(eventData.endOfRepeat),
        };
        const response = await api.post('/event/',formatDateData, { headers });
        return response.data;
    }
    catch(error) {
        handleApiError(error);
    }
};

export const editEvents = async (eventId,eventData) => {
    try {
        const headers = await getAuthHeaders();
        const formatDateData = {
            ...eventData,
            startDate: formatToUTC(eventData.startDate),
            endDate: formatToUTC(eventData.endDate),
            endOfRepeat: formatToUTC(eventData.endOfRepeat),
        };

        const response = await api.put(`/event/edit/${eventId}/`, formatDateData, { headers });
        return response.data;

    } catch (error) {
       handleApiError(error);
    }
};

export const getEvents = async (eventId) => {
    try {
        const headers = await getAuthHeaders();
        let url = '/events/';
        if (eventId) {
            url = `/event/${eventId}/`;  // get specific event by ID
        }

        const response = await api.get(url, { headers });

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
       handleApiError(error);
    }
};

export const deleteEvents = async (eventId) => {
    try {
        const headers = await getAuthHeaders();
        const config = { headers };
        const response = await axios.delete(`http://localhost:8000/api/version1/event/delete/${eventId}/`, config);
        return response.data;
    }
    catch(error) {
        handleApiError(error);
    }
};

export const createTask = async (taskData) => {
    try {
        const headers = await getAuthHeaders();
        const formatDateData = {
            ...taskData,
            dueDate: formatToUTC(taskData.dueDate),
        };

        const response = await api.post('/task/', formatDateData, { headers });
        return response.data;
    }
    catch(error) {
       handleApiError(error);
    }
};

export const editTask = async (taskId,taskData) => {
    try {
        const headers = await getAuthHeaders();
        const formatDateData = {
            ...taskData,
            dueDate: formatToUTC(taskData.dueDate),
        };

        console.log('Task Data to Save IN api:', formatDateData);
        const response = await api.put(`/task/edit/${taskId}/`,formatDateData, { headers});
        console.log('Task Edited Successfully:', response.data);
        return response.data;
    }
    catch(error) {
        handleApiError(error);
    }
};

export const getTask = async (taskId) => {
    try {
        const headers = await getAuthHeaders();
        let url = '/tasks/';
        if (taskId) {
            url = `/task/${taskId}/`;  // get specific event by ID
        }

        const response = await api.get(url, { headers});
        if (response.data && Array.isArray(response.data)) {
            response.data.forEach(task => {
                if (!task.id) {
                    console.error('Task missing ID:', task);
                }
            });
        }
        return response.data
    }
    catch(error) {
        handleApiError(error);
    }
};

export const deleteTask = async (taskId) => {
    try {
        const headers = await getAuthHeaders();
        const config = { headers };
        const response = await axios.delete(`http://localhost:8000/api/version1/task/delete/${taskId}/`, config);
        return response.data;
    }
    catch(error) {
        handleApiError(error);
    }
};

export const createReminder = async (reminderData) => {
    try {
        const response = await api.post('/reminder/',reminderData);
        return response.data;
    }
    catch(error) {
        handleApiError(error);
    }
};

export const editReminder = async (reminderId,reminderData) => {
    try {
        const response = await api.put(`/reminder/edit/${reminderId}/`,reminderData);
        return response.data;
    }
    catch(error) {
        handleApiError(error);
    }
};

