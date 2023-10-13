import api from '../utils/axiosProductionInterface';

const setAuthToken = token => {
    if(token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('token', token);
    } else {
        delete api.defaults.headers.common['Authorization'];
        localStorage.removeItem('token');
    }
}

export default setAuthToken;