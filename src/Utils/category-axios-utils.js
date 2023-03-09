import axios from 'axios';

const client = axios.create({
    baseURL: 'https://localhost:7258/Category',
  });

  export const getCategories = async () => {
    try {
      const response = await client.get(`/getAll`);
      return response.data;
    } catch (err) {
      console.error(err.message);
      return [];
    }
  };