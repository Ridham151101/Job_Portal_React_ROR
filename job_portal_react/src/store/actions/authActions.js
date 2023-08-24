import axios from "axios";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post("http://localhost:3001/signup", {
      user: userData,
    });
    return response;
  } catch (error) {
    // console.log("clg", error);
    return error;
  }
};

export const loginUser = async (credentials) => {
  // console.log("credentials: ", credentials);
  try {
    const response = await axios.post("http://localhost:3001/login", {
      user: credentials,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.delete("http://localhost:3001/logout");
    return response;
  } catch (error) {
    return error;
  }
};
