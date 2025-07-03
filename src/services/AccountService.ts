import axios from "axios";
import { Account } from "../types";

const REST_API_BASE_URL = 'http://localhost:5242';

export const api = axios.create({
  baseURL: REST_API_BASE_URL,
  /* cookie is send */
  withCredentials: true,
});

export const createAccount = (account: Account) => api.post('/signup', account);

/* during registration, username is checked, if already taken */
export const checkUsernameAvailability = async (username: string): Promise<boolean> => {
  try {
    const res = await api.get(`/username-check/${username}`);
    return res.data.available;
  } catch (error) {
    console.error("Error checking username availability:", error);
    return false;
  }
};

export const loginAccount = async (credentials: { username: string; password: string }) => {
  try {
    return await api.post('/login', credentials);
  } catch (error) {
    throw new Error("Login not successful. Please try again!");
  }
};

export const logoutAccount = async () => {
  try {
    await api.post('/logout');
  } catch (error) {
    console.error("Logout error:", error);
  }
};

/* check for valid token and current username is returned */
export const getMe = () => api.get('/me');

export const getAccount = () => api.get('/api/account');

export const updateAccount = (accountId: string, account: Account) => {
  return api.put(`/accounts/${accountId}`, account);
};

export const deleteAccount = (accountId: string) => {
  return api.delete(`/accounts/${accountId}`);
};
 
