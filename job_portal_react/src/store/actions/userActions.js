import axiosInstance from "../../api/axios-interceptor.js";

export const updateProfile = async (updatedData) => {
  try {
    const response = await axiosInstance.patch("/api/v1/profile", {
      user: updatedData,
    });
    return response;
  } catch (error) {
    return error;
  }
};
