import { showNotificationWithTimeout } from '../redux/slices/notificationSlice.js';
import axiosInstance from './config.js'; 

const googleLoginUser = async (token, setLoading, dispatch) => {
    setLoading(true);
    try {
        const response = await axiosInstance.post(
            `/api/v1/user/google-login`,
            {
                name: token.name,
                email: token.email,
                profilePic: token.picture,
            },
            { withCredentials: true }
        );
        setLoading(false);
        dispatch(showNotificationWithTimeout({show:true, type:"success", message:response.data.message}));
        return response.data;
    } catch (error) {
        throw error;
    }
};

const logoutUser = async (setLoading, dispatch) => {
    setLoading(true);
    try {
        const response = await axiosInstance.get(
            `/api/v1/tenant/logout`, 
            { withCredentials: true }
        );
        setLoading(false);
        dispatch(showNotificationWithTimeout({show:true, type:"success", message:response.data.message}));
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getCurrentUser = async (setLoading, dispatch) => {
    setLoading(true);
    try {
        const response = await axiosInstance.get(
            `/api/v1/user/current-user`,
            {withCredentials: true}
        );
        setLoading(false);
        dispatch(showNotificationWithTimeout({show:true, type:"success", message:response.data.message}));
        return response.data;
    } catch (error) {
        throw error
    }
};

const loginUser = async (formData, setLoading, dispatch) => {
    setLoading(true);
    try {
        const response = await axiosInstance.post(
            `/api/v1/user/login`,
            formData,
            { withCredentials: true }
        );
        setLoading(false);
        dispatch(showNotificationWithTimeout({show:true, type:"success", message:response.data.message}));
        return response.data;
    } catch (error) {
        throw error
    }
};

export { googleLoginUser, logoutUser, getCurrentUser, loginUser }


