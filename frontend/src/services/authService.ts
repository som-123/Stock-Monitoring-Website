import { basicAxios } from "./basicAxios";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}

export const register = async (userData: UserData) => {
  try {
    const response = await basicAxios("/api/register/", {
      method: "POST",
      data: userData,
    });
    const { user, access, refresh } = response.data;
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    return user;
  } catch (error) {
    throw error;
  }
};
