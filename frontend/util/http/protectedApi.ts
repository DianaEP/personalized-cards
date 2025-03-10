import axiosInstance from "./axiosInstance"

export const getProtectedData = async () => {
    try{
        const response =  await axiosInstance.get('/protected');
        return response.data;
    }catch(error){
        console.error('Error fetching protected data:', error);
        throw error;
    }
}