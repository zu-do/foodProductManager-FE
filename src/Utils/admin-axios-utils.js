import axios from 'axios';

const client = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}/Admin`,
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
