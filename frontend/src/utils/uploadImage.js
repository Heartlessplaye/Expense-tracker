// This function uploads an image file to the server using FormData and axios.
// It appends the image file to a FormData object and sends a POST request to the server.
// The server URL is defined in the API_PATHS object. The function returns the response data containing the image URL if successful, or throws an error if the upload fails.
import { API_PATHS } from "./apiPaths";

import axiosInstance from "./axiosInstance";
const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile); // Append the image file to the form data

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data; // Return the response data containing the image URL
  } catch (err) {
    console.error("Error uploading image:", err);
    throw err; // Rethrow the error for further handling if needed
  }
};
export default uploadImage;
