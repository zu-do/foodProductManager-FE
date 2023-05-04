import axios from "axios";

const client = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/User`
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
