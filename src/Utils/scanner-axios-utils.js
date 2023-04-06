import axios from 'axios';

const client = axios.create({
    baseURL: 'https://localhost:7258/Scanner/barcode',
  });

  export const getProductInfo = async (barcode) => {
    try {
      const response = await client.get(`/${barcode}`);
      return response.data;
    } catch (err) {
      console.error(err.message);
      return [];
    }
  };
  