import axios from 'axios';

const client = axios.create({
    baseURL: 'https://localhost:7258/Admin',
  });

  export const loginAdmin = async (email, password) => {
    try {
      const response = await client.get(`login/${email}/${password}`);
      return response.data;
    } catch (err) {
      console.error(err.message);
      return null;
    }
  };
