import axios from 'axios';

const client = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Scanner/barcode`
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
  