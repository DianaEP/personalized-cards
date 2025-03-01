import axiosInstance from "./axiosInstance"

// Save image (POST)
export const saveImageUri = async( finalImageUri: string) => {
    try{
        const response = await axiosInstance.post('/postcards', { finalImageUri });
        return response.data;
    }catch(error){
        console.error('Error uploading image:', error);
        throw error;
    }
}

// Get all images(GET)
export const getImages = async () => {
    try{
        const response =  await axiosInstance.get('/postcards');
        return response.data;
    }catch(error){
        console.error('Error fetching image:', error);
        throw error;
    }
}

//Delete an image(DELETE)
export const deleteImage = async (id: string) => {
    try{
        const response = await axiosInstance.delete(`/postcards/${id}`);
        return response.data;
    }catch(error){
        console.error('Error deleting image:', error);
        throw error;
    }
}
