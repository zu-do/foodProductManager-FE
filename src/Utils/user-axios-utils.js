import axios from "axios";

const url = window.location.href;
const isAzure = url.includes('azurewebsites.net');
const baseURL = isAzure ? 'https://pvp-api.azurewebsites.net/' : 'https://localhost:7258/';

console.log(process.env.NODE_ENV);

const client = axios.create({
  baseURL: `${baseURL}User`
});

export const loginUser = async (email, password) => {
  try {
    const response = await client.get(`login/${email}/${password}`);
    return response.data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};

export const registerUser = async (body) => {
  try {
    const response = await client.post(`register`, { ...body });
    return response.data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
};

export const getUsers = async () => {
  try {
    const response = await client.get(`users`);
    return response.data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
};
